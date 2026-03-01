import { executeQuery, executeQueryWithClient } from "../db/query.js";

const queryWithOptionalClient = (queryText, values = [], client = null) => {
  if (client) {
    return executeQueryWithClient(client, queryText, values);
  }
  return executeQuery(queryText, values);
};

const createLog = async ({ adminId, action, entity, entityId = null }, client = null) => {
  const queryText = `
    INSERT INTO admin_activity_logs (admin_id, action, entity, entity_id)
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      admin_id AS "adminId",
      action,
      entity,
      entity_id AS "entityId",
      created_at AS "createdAt"
  `;
  const result = await queryWithOptionalClient(queryText, [adminId, action, entity, entityId], client);
  return { log: result.rows[0] || null, sql: result.sql };
};

const findRecent = async (limit = 20) => {
  const queryText = `
    SELECT
      l.id,
      l.admin_id AS "adminId",
      a.email AS "adminUsername",
      l.action,
      l.entity,
      l.entity_id AS "entityId",
      l.created_at AS "createdAt"
    FROM admin_activity_logs l
    LEFT JOIN admins a ON a.id = l.admin_id
    ORDER BY l.created_at DESC
    LIMIT $1
  `;
  const result = await executeQuery(queryText, [limit]);
  return { logs: result.rows, sql: result.sql };
};

export {
  createLog,
  findRecent,
};
