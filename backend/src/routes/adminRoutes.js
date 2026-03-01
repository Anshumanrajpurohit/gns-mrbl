import express from "express";
import rateLimit from "express-rate-limit";
import {
  loginAdmin,
  getNotificationEmail,
  updateNotificationEmail,
  getActivityLogs,
} from "../controllers/adminController.js";
import {
  getAdminStats,
  getLast7DaysStats,
  getServiceDistribution,
  getTrashEnquiries,
  restoreEnquiry,
} from "../controllers/enquiryController.js";
import { protect } from "../middleware/auth.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

router.post("/login", loginLimiter, loginAdmin);
router.get("/settings/notification-email", protect, getNotificationEmail);
router.patch("/settings/notification-email", protect, updateNotificationEmail);
router.get("/stats", protect, getAdminStats);
router.get("/stats/last-7-days", protect, getLast7DaysStats);
router.get("/stats/service-distribution", protect, getServiceDistribution);
router.get("/activity-log", protect, getActivityLogs);
router.get("/enquiries/trash", protect, getTrashEnquiries);
router.patch("/enquiries/:id/restore", protect, validateObjectId("id"), restoreEnquiry);

export default router;
