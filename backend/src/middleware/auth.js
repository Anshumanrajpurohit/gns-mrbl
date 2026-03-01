import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import * as adminRepository from "../repositories/adminRepository.js";
import { AppError } from "../utils/AppError.js";

const jwksVerifierCache = new Map();
const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const normalizeAuthError = (error, mode) => {
  if (mode === "jwks") {
    if (
      error?.name === "JsonWebTokenError" ||
      error?.name === "TokenExpiredError" ||
      error?.name === "NotBeforeError"
    ) {
      return new AppError("Invalid or expired token", 401);
    }

    return new AppError("Authentication verification temporarily unavailable", 503);
  }

  return new AppError("Invalid or expired token", 401);
};

const getJwksVerifier = (config) => {
  const cacheKey = `${config.NEON_JWKS_URL}|${config.NEON_JWT_ISSUER || ""}|${config.NEON_JWT_AUDIENCE || ""}`;
  if (jwksVerifierCache.has(cacheKey)) {
    return jwksVerifierCache.get(cacheKey);
  }

  const client = jwksClient({
    jwksUri: config.NEON_JWKS_URL,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10 * 60 * 1000,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    timeout: 15000,
  });

  const getKey = (header, callback) => {
    if (!header?.kid) {
      callback(new Error("Missing token key id"));
      return;
    }

    client.getSigningKey(header.kid, (error, key) => {
      if (error) {
        callback(error);
        return;
      }

      callback(null, key.getPublicKey());
    });
  };

  const verify = (token) =>
    new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          algorithms: ["RS256"],
          issuer: config.NEON_JWT_ISSUER || undefined,
          audience: config.NEON_JWT_AUDIENCE || undefined,
        },
        (error, decoded) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(decoded);
        }
      );
    });

  jwksVerifierCache.set(cacheKey, verify);
  return verify;
};

const verifyToken = async (token, config) => {
  if (config.AUTH_MODE === "jwks") {
    const verifyWithJwks = getJwksVerifier(config);
    return verifyWithJwks(token);
  }

  return jwt.verify(token, config.JWT_SECRET, {
    algorithms: ["HS256"],
  });
};

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    next(new AppError("Authorization token missing", 401));
    return;
  }

  const config = req.app.locals.config;
  const authMode = config.AUTH_MODE;

  try {
    const decoded = await verifyToken(token, config);
    const adminId = decoded?.id || decoded?.sub;

    if (!adminId || !uuidV4Regex.test(adminId)) {
      next(new AppError("Invalid or expired token", 401));
      return;
    }

    const { admin } = await adminRepository.findByIdWithoutPassword(adminId);
    if (!admin || !admin.isActive) {
      next(new AppError("Admin not found", 401));
      return;
    }

    if (admin.role !== "admin") {
      next(new AppError("Admin access required", 403));
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(normalizeAuthError(error, authMode));
  }
};

export { protect };
