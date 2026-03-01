import { executeQuery, executeQueryWithClient } from "../db/query.js";

const queryWithOptionalClient = (queryText, values = [], client = null) => {
  if (client) {
    return executeQueryWithClient(client, queryText, values);
  }
  return executeQuery(queryText, values);
};

const enquirySelectProjection = `
  SELECT
    id AS "_id",
    name,
    phone,
    email,
    service,
    message,
    contacted,
    contacted_at AS "contactedAt",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
  FROM enquiries
`;

const create = async (payload) => {
  const queryText = `
    INSERT INTO enquiries (name, phone, email, service, message)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id AS "_id",
      name,
      phone,
      email,
      service,
      message,
      contacted,
      contacted_at AS "contactedAt",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `;
  const values = [payload.name, payload.phone, payload.email, payload.service, payload.message];
  const result = await executeQuery(queryText, values);
  return { enquiry: result.rows[0] || null, sql: result.sql };
};

const findPaginated = async ({ searchTerm, sortDirection, page, limit, contacted }) => {
  const values = [];
  const whereClauses = ["deleted_at IS NULL"];

  if (searchTerm) {
    values.push(`%${searchTerm}%`);
    const searchParam = `$${values.length}`;
    whereClauses.push(
      `(name ILIKE ${searchParam} OR phone ILIKE ${searchParam} OR email ILIKE ${searchParam} OR service ILIKE ${searchParam} OR message ILIKE ${searchParam})`
    );
  }

  if (typeof contacted === "boolean") {
    values.push(contacted);
    whereClauses.push(`contacted = $${values.length}`);
  }

  values.push(limit);
  const limitParam = `$${values.length}`;
  values.push((page - 1) * limit);
  const offsetParam = `$${values.length}`;

  const queryText = `
    ${enquirySelectProjection}
    ${whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""}
    ORDER BY created_at ${sortDirection}
    LIMIT ${limitParam}
    OFFSET ${offsetParam}
  `;

  const result = await executeQuery(queryText, values);
  return { enquiries: result.rows, sql: result.sql };
};

const findById = async (id) => {
  const queryText = `${enquirySelectProjection} WHERE id = $1 AND deleted_at IS NULL LIMIT 1`;
  const result = await executeQuery(queryText, [id]);
  return { enquiry: result.rows[0] || null, sql: result.sql };
};

const updateContactedStatus = async (id, contacted, client = null) => {
  const queryText = `
    UPDATE enquiries
    SET
      contacted = $2,
      contacted_at = CASE WHEN $2 THEN NOW() ELSE NULL END,
      updated_at = NOW()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING
      id AS "_id",
      name,
      phone,
      email,
      service,
      message,
      contacted,
      contacted_at AS "contactedAt",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `;
  const result = await queryWithOptionalClient(queryText, [id, contacted], client);
  return { enquiry: result.rows[0] || null, sql: result.sql };
};

const deleteById = async (id, client = null) => {
  const queryText = `
    UPDATE enquiries
    SET deleted_at = NOW(), updated_at = NOW()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING id AS _id
  `;
  const result = await queryWithOptionalClient(queryText, [id], client);
  return { deletedId: result.rows[0]?._id || null, sql: result.sql };
};

const findTrashPaginated = async ({ searchTerm, page, limit }) => {
  const values = [];
  const whereClauses = ["deleted_at IS NOT NULL"];

  if (searchTerm) {
    values.push(`%${searchTerm}%`);
    const searchParam = `$${values.length}`;
    whereClauses.push(
      `(name ILIKE ${searchParam} OR phone ILIKE ${searchParam} OR email ILIKE ${searchParam} OR service ILIKE ${searchParam} OR message ILIKE ${searchParam})`
    );
  }

  values.push(limit);
  const limitParam = `$${values.length}`;
  values.push((page - 1) * limit);
  const offsetParam = `$${values.length}`;

  const queryText = `
    SELECT
      id AS "_id",
      name,
      phone,
      email,
      service,
      message,
      contacted,
      contacted_at AS "contactedAt",
      created_at AS "createdAt",
      updated_at AS "updatedAt",
      deleted_at AS "deletedAt"
    FROM enquiries
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY deleted_at DESC
    LIMIT ${limitParam}
    OFFSET ${offsetParam}
  `;
  const result = await executeQuery(queryText, values);
  return { enquiries: result.rows, sql: result.sql };
};

const restoreById = async (id, client = null) => {
  const queryText = `
    UPDATE enquiries
    SET deleted_at = NULL, updated_at = NOW()
    WHERE id = $1 AND deleted_at IS NOT NULL
    RETURNING id AS _id
  `;
  const result = await queryWithOptionalClient(queryText, [id], client);
  return { restoredId: result.rows[0]?._id || null, sql: result.sql };
};

const getOverviewStats = async () => {
  const queryText = `
    SELECT
      COUNT(*)::int AS "totalEnquiries",
      COUNT(*) FILTER (WHERE created_at::date = CURRENT_DATE)::int AS "todayEnquiries",
      COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW()))::int AS "monthEnquiries",
      COUNT(*) FILTER (WHERE contacted = TRUE)::int AS "contactedCount",
      COUNT(*) FILTER (WHERE contacted = FALSE)::int AS "pendingCount"
    FROM enquiries
    WHERE deleted_at IS NULL
  `;
  const result = await executeQuery(queryText);
  return { stats: result.rows[0] || null, sql: result.sql };
};

const getLast7DaysStats = async () => {
  const queryText = `
    WITH days AS (
      SELECT generate_series(CURRENT_DATE - INTERVAL '6 day', CURRENT_DATE, INTERVAL '1 day')::date AS day
    )
    SELECT
      days.day::text AS date,
      COALESCE(COUNT(e.id), 0)::int AS count
    FROM days
    LEFT JOIN enquiries e
      ON e.created_at::date = days.day
      AND e.deleted_at IS NULL
    GROUP BY days.day
    ORDER BY days.day ASC
  `;
  const result = await executeQuery(queryText);
  return { stats: result.rows, sql: result.sql };
};

const getServiceDistribution = async () => {
  const queryText = `
    SELECT
      service,
      COUNT(*)::int AS count
    FROM enquiries
    WHERE deleted_at IS NULL
    GROUP BY service
    ORDER BY count DESC, service ASC
  `;
  const result = await executeQuery(queryText);
  return { distribution: result.rows, sql: result.sql };
};

export {
  create,
  findPaginated,
  findById,
  updateContactedStatus,
  deleteById,
  findTrashPaginated,
  restoreById,
  getOverviewStats,
  getLast7DaysStats,
  getServiceDistribution,
};
