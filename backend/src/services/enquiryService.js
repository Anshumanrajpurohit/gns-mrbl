import { ZodError } from "zod";
import { getPool } from "../db/pool.js";
import * as enquiryRepository from "../repositories/enquiryRepository.js";
import * as adminRepository from "../repositories/adminRepository.js";
import * as adminActivityLogRepository from "../repositories/adminActivityLogRepository.js";
import {
  enquiryCreateSchema,
  enquiryStatusUpdateSchema,
  enquiryListQuerySchema,
} from "../validators/enquiryValidator.js";
import { AppError } from "../utils/AppError.js";
import { sendEnquiryNotifications } from "./emailService.js";

const parseValidation = (schema, payload) => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError("Invalid payload", 400, { issues: error.issues });
    }
    throw error;
  }
};

const createEnquiry = async (payload) => {
  const parsed = parseValidation(enquiryCreateSchema, payload);
  const { enquiry, sql } = await enquiryRepository.create(parsed);

  setImmediate(async () => {
    try {
      const { setting } = await adminRepository.getNotificationEmail();
      await sendEnquiryNotifications({
        enquiry,
        adminEmail: setting?.email || null,
      });
    } catch (error) {
      console.error("Unable to send enquiry notifications:", error.message);
    }
  });

  return { enquiry, sql };
};

const listEnquiries = async (queryPayload) => {
  const query = parseValidation(enquiryListQuerySchema, queryPayload);
  const sortDirection = query.sort === "createdAt" ? "ASC" : "DESC";
  const contacted = typeof query.contacted !== "undefined" ? query.contacted === "true" : undefined;

  const { enquiries, sql } = await enquiryRepository.findPaginated({
    searchTerm: query.search || "",
    sortDirection,
    page: query.page,
    limit: query.limit,
    contacted,
  });

  return { enquiries, sql };
};

const updateEnquiryContactedStatus = async (id, payload, adminId = null) => {
  const { contacted } = parseValidation(enquiryStatusUpdateSchema, payload);
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const { enquiry, sql } = await enquiryRepository.updateContactedStatus(id, contacted, client);
    if (!enquiry) {
      throw new AppError("Enquiry not found", 404);
    }

    if (adminId && contacted) {
      await adminActivityLogRepository.createLog(
        {
          adminId,
          action: "MARK_CONTACTED",
          entity: "ENQUIRY",
          entityId: id,
        },
        client
      );
    }

    await client.query("COMMIT");
    return { enquiry, sql };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const removeEnquiry = async (id, adminId = null) => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const { deletedId, sql } = await enquiryRepository.deleteById(id, client);
    if (!deletedId) {
      throw new AppError("Enquiry not found", 404);
    }

    if (adminId) {
      await adminActivityLogRepository.createLog(
        {
          adminId,
          action: "DELETE_ENQUIRY",
          entity: "ENQUIRY",
          entityId: id,
        },
        client
      );
    }

    await client.query("COMMIT");
    return { sql };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const listTrashEnquiries = async (queryPayload) => {
  const query = parseValidation(enquiryListQuerySchema, queryPayload);
  const { enquiries, sql } = await enquiryRepository.findTrashPaginated({
    searchTerm: query.search || "",
    page: query.page,
    limit: query.limit,
  });
  return { enquiries, sql };
};

const restoreEnquiry = async (id, adminId = null) => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const { restoredId, sql } = await enquiryRepository.restoreById(id, client);
    if (!restoredId) {
      throw new AppError("Enquiry not found", 404);
    }

    if (adminId) {
      await adminActivityLogRepository.createLog(
        {
          adminId,
          action: "RESTORE_ENQUIRY",
          entity: "ENQUIRY",
          entityId: id,
        },
        client
      );
    }

    await client.query("COMMIT");
    return { sql };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getAdminStats = async () => {
  const { stats, sql } = await enquiryRepository.getOverviewStats();
  return { stats, sql };
};

const getLast7DaysStats = async () => {
  const { stats, sql } = await enquiryRepository.getLast7DaysStats();
  return { stats, sql };
};

const getServiceDistribution = async () => {
  const { distribution, sql } = await enquiryRepository.getServiceDistribution();
  return { distribution, sql };
};

export {
  createEnquiry,
  listEnquiries,
  updateEnquiryContactedStatus,
  removeEnquiry,
  listTrashEnquiries,
  restoreEnquiry,
  getAdminStats,
  getLast7DaysStats,
  getServiceDistribution,
};
