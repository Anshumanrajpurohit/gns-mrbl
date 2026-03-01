import { connectPool, disconnectPool } from "../db/pool.js";

const connectDB = async (config) => {
  await connectPool(config);
};

const disconnectDB = async () => {
  await disconnectPool();
};

export { connectDB, disconnectDB };
