import { z } from "zod";

const loginSchema = z.object({
  username: z.string().trim().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

const notificationEmailSchema = z.object({
  email: z.string().trim().email("Valid email is required"),
});

export { loginSchema, notificationEmailSchema };
