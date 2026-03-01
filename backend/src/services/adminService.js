import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { getPool } from "../db/pool.js";
import { loginSchema, notificationEmailSchema } from "../validators/adminValidator.js";
import * as adminRepository from "../repositories/adminRepository.js";
import * as adminActivityLogRepository from "../repositories/adminActivityLogRepository.js";
import { AppError } from "../utils/AppError.js";

const signToken = (payload, config) => {
  if (!config.JWT_SECRET) {
    throw new AppError("Authentication configuration missing", 500);
  }

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN || "12h",
    algorithm: "HS256",
  });
};

const loginAdmin = async (payload, config) => {
  let credentials;
  try {
    credentials = loginSchema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError("Invalid payload", 400, { issues: error.issues });
    }
    throw error;
  }

  const { admin, sql: loginSelectSql } = await adminRepository.findByUsername(credentials.username.toLowerCase());
  if (!admin || !admin.isActive) {
    throw new AppError("Invalid credentials", 401);
  }

  if (admin.lockedUntil && new Date(admin.lockedUntil) > new Date()) {
    throw new AppError("Account is temporarily locked. Please try again later.", 423);
  }

  const passwordMatches = await bcrypt.compare(credentials.password, admin.passwordHash);
  if (!passwordMatches) {
    await adminRepository.recordFailedLoginAttempt(admin.id, 5, 15);
    throw new AppError("Invalid credentials", 401);
  }

  if (admin.role !== "admin") {
    throw new AppError("Admin access required", 403);
  }

  const pool = getPool();
  const client = await pool.connect();

  let updateLoginSql = "";
  try {
    await client.query("BEGIN");
    const updateLoginResult = await adminRepository.recordSuccessfulLogin(admin.id, client);
    updateLoginSql = updateLoginResult.sql;
    await adminActivityLogRepository.createLog(
      {
        adminId: admin.id,
        action: "LOGIN",
        entity: "ADMIN",
        entityId: admin.id,
      },
      client
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  const token = signToken({ id: admin.id, username: admin.username, role: admin.role }, config);

  return {
    token,
    admin: {
      username: admin.username,
      role: admin.role,
    },
    sql: `${loginSelectSql}; ${updateLoginSql}`,
  };
};

const getNotificationEmail = async () => {
  const { setting, sql } = await adminRepository.getNotificationEmail();
  return {
    setting: {
      email: setting?.email || null,
    },
    sql,
  };
};

const updateNotificationEmail = async (payload, adminId) => {
  let input;
  try {
    input = notificationEmailSchema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError("Invalid payload", 400, { issues: error.issues });
    }
    throw error;
  }

  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const { admin: setting, sql } = await adminRepository.upsertNotificationEmail(input.email, adminId, client);
    await adminActivityLogRepository.createLog(
      {
        adminId,
        action: "UPDATE_ADMIN_NOTIFICATION_EMAIL",
        entity: "ADMIN_SETTING",
        entityId: null,
      },
      client
    );
    await client.query("COMMIT");
    return {
      setting: {
        email: setting?.email || input.email,
      },
      sql,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getActivityLogs = async () => {
  const { logs, sql } = await adminActivityLogRepository.findRecent(20);
  return { logs, sql };
};

export {
  loginAdmin,
  getNotificationEmail,
  updateNotificationEmail,
  getActivityLogs,
};
