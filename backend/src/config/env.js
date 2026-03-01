import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().trim().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().trim().optional(),
  NEON_JWKS_URL: z.string().trim().url("NEON_JWKS_URL must be a valid URL").optional(),
  NEON_JWT_AUDIENCE: z.string().trim().optional(),
  NEON_JWT_ISSUER: z.string().trim().url("NEON_JWT_ISSUER must be a valid URL").optional(),
  JWT_EXPIRES_IN: z.string().default("12h"),
  CLIENT_URL: z.string().trim().min(1, "CLIENT_URL is required"),
  ADMIN_DEFAULT_EMAIL: z.string().email().optional(),
  ADMIN_DEFAULT_PASSWORD: z.string().optional(),
  SMTP_HOST: z.string().trim().optional(),
  SMTP_PORT: z.string().trim().optional(),
  SMTP_USER: z.string().trim().optional(),
  SMTP_PASS: z.string().trim().optional(),
  PG_POOL_MAX: z.coerce.number().int().min(1).max(100).default(10),
  PG_IDLE_TIMEOUT_MS: z.coerce.number().int().min(1000).default(30000),
  PG_CONNECTION_TIMEOUT_MS: z.coerce.number().int().min(1000).default(10000),
  DB_CONNECT_MAX_RETRIES: z.coerce.number().int().min(1).default(5),
  DB_CONNECT_RETRY_DELAY_MS: z.coerce.number().int().min(100).default(2000),
}).superRefine((env, ctx) => {
  const hasJwtSecret = Boolean(env.JWT_SECRET);
  const hasJwks = Boolean(env.NEON_JWKS_URL);

  if (!hasJwtSecret && !hasJwks) {
    ctx.addIssue({
      path: ["JWT_SECRET"],
      code: z.ZodIssueCode.custom,
      message: "JWT_SECRET is required when NEON_JWKS_URL is not set",
    });
  }

  if (hasJwtSecret && env.JWT_SECRET.length < 32) {
    ctx.addIssue({
      path: ["JWT_SECRET"],
      code: z.ZodIssueCode.custom,
      message: "JWT_SECRET must be at least 32 characters",
    });
  }

  if (hasJwks && !env.NEON_JWT_ISSUER) {
    ctx.addIssue({
      path: ["NEON_JWT_ISSUER"],
      code: z.ZodIssueCode.custom,
      message: "NEON_JWT_ISSUER is required when NEON_JWKS_URL is set",
    });
  }

  if (hasJwks && !env.NEON_JWT_AUDIENCE) {
    ctx.addIssue({
      path: ["NEON_JWT_AUDIENCE"],
      code: z.ZodIssueCode.custom,
      message: "NEON_JWT_AUDIENCE is required when NEON_JWKS_URL is set",
    });
  }
});

const loadEnv = () => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    throw new Error(`Invalid environment configuration: ${issues}`);
  }

  const env = parsed.data;
  return {
    ...env,
    PORT: Number(env.PORT),
    AUTH_MODE: env.NEON_JWKS_URL ? "jwks" : "jwt",
  };
};

export { loadEnv };
