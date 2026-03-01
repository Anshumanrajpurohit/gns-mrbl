import { getPool } from "./pool.js";

const normalizeSql = (text) => text.replace(/\s+/g, " ").trim();

const formatResult = (result, text) => ({
  ...result,
  sql: normalizeSql(text),
});

const executeQuery = async (text, values = []) => {
  const result = await getPool().query(text, values);
  return formatResult(result, text);
};

const executeQueryWithClient = async (client, text, values = []) => {
  const result = await client.query(text, values);
  return formatResult(result, text);
};

export { executeQuery, executeQueryWithClient, normalizeSql };
