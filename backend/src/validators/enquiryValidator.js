import { z } from "zod";

const enquiryCreateSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[0-9+\-()\s]+$/, "Phone number contains invalid characters"),
  email: z.string().trim().email(),
  service: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10).max(1200),
});

const enquiryStatusUpdateSchema = z.object({
  contacted: z.boolean(),
});

const enquiryListQuerySchema = z.object({
  search: z.string().trim().max(120).optional().default(""),
  contacted: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  sort: z.enum(["createdAt", "-createdAt"]).optional().default("-createdAt"),
});

export {
  enquiryCreateSchema,
  enquiryStatusUpdateSchema,
  enquiryListQuerySchema,
};
