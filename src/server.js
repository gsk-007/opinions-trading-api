import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./config/logger.js";

const app = express();

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

app.get("/", (req, res) => {
  res.send("Api is Running");
});

export default app;
