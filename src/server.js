import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import logger from "./config/logger.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { userRoutes } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { eventRoutes } from "./routes/eventRoutes.js";
import { tradeRoutes } from "./routes/tradeRoutes.js";
import { marketRoutes } from "./routes/marketRoutes.js";
import http from "http";
import { initializeSocket } from "./socket/socket.js";

const app = express();
const server = http.createServer();

initializeSocket(server);

app.use(cors());

const stream = {
  write: (msg) => logger.info(msg.trim()),
};
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("combinded", { stream }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/markets", marketRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
