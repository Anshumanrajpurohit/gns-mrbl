import express from "express";
import rateLimit from "express-rate-limit";
import {
  createEnquiry,
  getEnquiries,
  markEnquiryContacted,
  deleteEnquiry,
} from "../controllers/enquiryController.js";
import { protect } from "../middleware/auth.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = express.Router();

const enquiryLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many enquiries from this IP, please try again shortly.",
});

router.post("/", enquiryLimiter, createEnquiry);
router.get("/", protect, getEnquiries);
router.patch("/:id/contacted", protect, validateObjectId("id"), markEnquiryContacted);
router.delete("/:id", protect, validateObjectId("id"), deleteEnquiry);

export default router;
