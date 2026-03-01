import { Pool } from "pg";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let poolInstance = null;

const createPool = (config) =>
  new Pool({
    connectionString: config.DATABASE_URL,
    max: config.PG_POOL_MAX,
    idleTimeoutMillis: config.PG_IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: config.PG_CONNECTION_TIMEOUT_MS,
    ssl: {
      rejectUnauthorized: false,
    },
  });

const connectPool = async (config) => {
  let attempt = 0;
  let lastError;

  while (attempt < config.DB_CONNECT_MAX_RETRIES) {
    attempt += 1;

    try {
      poolInstance = createPool(config);
      await poolInstance.query("SELECT 1");
      console.log("PostgreSQL connected");
      return;
    } catch (error) {
      lastError = error;
      console.error(`PostgreSQL connection attempt ${attempt}/${config.DB_CONNECT_MAX_RETRIES} failed`);

      if (poolInstance) {
        await poolInstance.end().catch(() => {});
        poolInstance = null;
      }

      if (attempt < config.DB_CONNECT_MAX_RETRIES) {
        await sleep(config.DB_CONNECT_RETRY_DELAY_MS * attempt);
      }
    }
  }

  throw new Error(
    `PostgreSQL connection failed after ${config.DB_CONNECT_MAX_RETRIES} attempts: ${lastError?.message || "Unknown error"}`
  );
};

const getPool = () => {
  if (!poolInstance) {
    throw new Error("Database pool is not initialized");
  }
  return poolInstance;
};

const disconnectPool = async () => {
  if (poolInstance) {
    await poolInstance.end();
    poolInstance = null;
  }
};

export { connectPool, getPool, disconnectPool };
