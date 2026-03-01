import { asyncHandler } from "../utils/asyncHandler.js";
import * as adminService from "../services/adminService.js";

const setSqlQueryHeader = (req, res, sql) => {
  if (req.app.locals.config?.NODE_ENV === "development" && sql) {
    res.set("X-SQL-Query", sql);
  }
};

const loginAdmin = asyncHandler(async (req, res) => {
  const config = req.app.locals.config;
  const result = await adminService.loginAdmin(req.body, config);
  setSqlQueryHeader(req, res, result.sql);
  delete result.sql;
  res.json(result);
});

const getNotificationEmail = asyncHandler(async (req, res) => {
  const result = await adminService.getNotificationEmail();
  setSqlQueryHeader(req, res, result.sql);
  delete result.sql;
  res.json({ data: result.setting });
});

const updateNotificationEmail = asyncHandler(async (req, res) => {
  const result = await adminService.updateNotificationEmail(req.body, req.admin.id);
  setSqlQueryHeader(req, res, result.sql);
  delete result.sql;
  res.json({ message: "Admin email updated", data: result.setting });
});

const getActivityLogs = asyncHandler(async (req, res) => {
  const result = await adminService.getActivityLogs();
  setSqlQueryHeader(req, res, result.sql);
  res.json({ data: result.logs });
});

export {
  loginAdmin,
  getNotificationEmail,
  updateNotificationEmail,
  getActivityLogs,
};
