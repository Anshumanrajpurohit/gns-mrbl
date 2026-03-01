import * as enquiryService from "../services/enquiryService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const setSqlQueryHeader = (req, res, sql) => {
  if (req.app.locals.config?.NODE_ENV === "development" && sql) {
    res.set("X-SQL-Query", sql);
  }
};

const createEnquiry = asyncHandler(async (req, res) => {
  const { enquiry, sql } = await enquiryService.createEnquiry(req.body);
  setSqlQueryHeader(req, res, sql);
  res.status(201).json({ message: "Enquiry submitted", data: enquiry });
});

const getEnquiries = asyncHandler(async (req, res) => {
  const { enquiries, sql } = await enquiryService.listEnquiries(req.query);
  setSqlQueryHeader(req, res, sql);
  res.json({ data: enquiries });
});

const markEnquiryContacted = asyncHandler(async (req, res) => {
  const { enquiry, sql } = await enquiryService.updateEnquiryContactedStatus(req.params.id, req.body, req.admin?.id);
  setSqlQueryHeader(req, res, sql);
  res.json({ message: "Enquiry updated", data: enquiry });
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { sql } = await enquiryService.removeEnquiry(req.params.id, req.admin?.id);
  setSqlQueryHeader(req, res, sql);
  res.json({ message: "Enquiry deleted" });
});

const getTrashEnquiries = asyncHandler(async (req, res) => {
  const { enquiries, sql } = await enquiryService.listTrashEnquiries(req.query);
  setSqlQueryHeader(req, res, sql);
  res.json({ data: enquiries });
});

const restoreEnquiry = asyncHandler(async (req, res) => {
  const { sql } = await enquiryService.restoreEnquiry(req.params.id, req.admin?.id);
  setSqlQueryHeader(req, res, sql);
  res.json({ message: "Enquiry restored" });
});

const getAdminStats = asyncHandler(async (req, res) => {
  const { stats, sql } = await enquiryService.getAdminStats();
  setSqlQueryHeader(req, res, sql);
  res.json({ data: stats });
});

const getLast7DaysStats = asyncHandler(async (req, res) => {
  const { stats, sql } = await enquiryService.getLast7DaysStats();
  setSqlQueryHeader(req, res, sql);
  res.json({ data: stats });
});

const getServiceDistribution = asyncHandler(async (req, res) => {
  const { distribution, sql } = await enquiryService.getServiceDistribution();
  setSqlQueryHeader(req, res, sql);
  res.json({ data: distribution });
});

export {
  createEnquiry,
  getEnquiries,
  markEnquiryContacted,
  deleteEnquiry,
  getTrashEnquiries,
  restoreEnquiry,
  getAdminStats,
  getLast7DaysStats,
  getServiceDistribution,
};
