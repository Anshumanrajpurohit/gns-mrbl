import { executeQuery, executeQueryWithClient } from "../db/query.js";

const selectAdminForAuth = `
  SELECT
    id,
    email AS username,
    password_hash AS "passwordHash",
    role,
    is_active AS "isActive",
    failed_login_attempts AS "failedLoginAttempts",
    locked_until AS "lockedUntil",
    last_login_at AS "lastLoginAt",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
  FROM admins
`;

const queryWithOptionalClient = (queryText, values = [], client = null) => {
  if (client) {
    return executeQueryWithClient(client, queryText, values);
  }
  return executeQuery(queryText, values);
};

const findByUsername = async (username) => {
  const queryText = `${selectAdminForAuth} WHERE email = $1 LIMIT 1`;
  const result = await executeQuery(queryText, [username]);
  return { admin: result.rows[0] || null, sql: result.sql };
};

const findByIdWithoutPassword = async (id) => {
  const queryText = `
    SELECT
      id,
      email AS username,
      role,
      is_active AS "isActive",
      failed_login_attempts AS "failedLoginAttempts",
      locked_until AS "lockedUntil",
      last_login_at AS "lastLoginAt",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM admins
    WHERE id = $1
    LIMIT 1
  `;
  const result = await executeQuery(queryText, [id]);
  return { admin: result.rows[0] || null, sql: result.sql };
};

const countAdmins = async () => {
  const result = await executeQuery("SELECT COUNT(*)::int AS count FROM admins");
  return { count: result.rows[0]?.count || 0, sql: result.sql };
};

const createAdmin = async ({ email, passwordHash, role, isActive }) => {
  const queryText = `
    INSERT INTO admins (email, password_hash, role, is_active)
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      email AS username,
      role,
      is_active AS "isActive",
      failed_login_attempts AS "failedLoginAttempts",
      locked_until AS "lockedUntil",
      last_login_at AS "lastLoginAt",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `;
  const result = await executeQuery(queryText, [email, passwordHash, role, isActive]);
  return { admin: result.rows[0] || null, sql: result.sql };
};

const recordSuccessfulLogin = async (id, client = null) => {
  const queryText = `
    UPDATE admins
    SET
      last_login_at = NOW(),
      failed_login_attempts = 0,
      locked_until = NULL,
      updated_at = NOW()
    WHERE id = $1
    RETURNING
      id,
      email AS username,
      role,
      is_active AS "isActive",
      failed_login_attempts AS "failedLoginAttempts",
      locked_until AS "lockedUntil",
      last_login_at AS "lastLoginAt",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `;
  const result = await queryWithOptionalClient(queryText, [id], client);
  return { admin: result.rows[0] || null, sql: result.sql };
};

const recordFailedLoginAttempt = async (id, maxAttempts = 5, lockMinutes = 15) => {
  const queryText = `
    UPDATE admins
    SET
      failed_login_attempts = COALESCE(failed_login_attempts, 0) + 1,
      locked_until = CASE
        WHEN COALESCE(failed_login_attempts, 0) + 1 >= $2 THEN NOW() + ($3::text || ' minutes')::interval
        ELSE locked_until
      END,
      updated_at = NOW()
    WHERE id = $1
    RETURNING
      failed_login_attempts AS "failedLoginAttempts",
      locked_until AS "lockedUntil"
  `;
  const result = await executeQuery(queryText, [id, maxAttempts, lockMinutes]);
  return { admin: result.rows[0] || null, sql: result.sql };
};

const getNotificationEmail = async () => {
  const queryText = `
    SELECT
      key,
      value AS email
    FROM admin_settings
    WHERE key = 'notification_email'
    LIMIT 1
  `;
  const result = await executeQuery(queryText);
  return { setting: result.rows[0] || null, sql: result.sql };
};

const upsertNotificationEmail = async (email, adminId, client = null) => {
  const queryText = `
    INSERT INTO admin_settings (key, value, updated_by)
    VALUES ('notification_email', $1, $2)
    ON CONFLICT (key)
    DO UPDATE
      SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = NOW()
    RETURNING
      key,
      value AS email,
      updated_by AS "updatedBy",
      updated_at AS "updatedAt"
  `;
  const result = await queryWithOptionalClient(queryText, [email, adminId], client);
  return { admin: result.rows[0] || null, sql: result.sql };
};

export {
  findByUsername,
  findByIdWithoutPassword,
  countAdmins,
  createAdmin,
  recordSuccessfulLogin,
  recordFailedLoginAttempt,
  getNotificationEmail,
  upsertNotificationEmail,
};
