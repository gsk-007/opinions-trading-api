import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;

import app from "./server.js";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";

const start = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be present");
  }

  await connectDB();

  app.listen(port, () => {
    logger.info(`Server is running in ${env} mode on port ${port}`);
  });
};

start();
