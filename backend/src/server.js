import "dotenv/config";
import http from "node:http";
import app from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { loadEnv } from "./config/env.js";
import { bootstrapAdmin } from "./utils/bootstrapAdmin.js";

const config = loadEnv();
const PORT = config.PORT;

console.log("AUTH MODE:", config.AUTH_MODE);


let server;
let shuttingDown = false;

const gracefulShutdown = async (signal) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`${signal} received, shutting down gracefully`);

  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await disconnectDB();
    console.log("Shutdown complete");
    process.exit(0);
  } catch (error) {
    console.error("Shutdown failure");
    if (config.NODE_ENV !== "production") {
      console.error(error);
    }
    process.exit(1);
  }
};

(async () => {
  try {
    await connectDB(config);
    await bootstrapAdmin();

    app.locals.config = config;
    server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`API server ready on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start failure");
    if (config.NODE_ENV !== "production") {
      console.error(error);
    }
    process.exit(1);
  }
})();

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
