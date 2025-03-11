import winston from "winston";

const env = process.env.NODE_ENV;

const logger = winston.createLogger({
  level: env === "development" ? "debug" : "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (env === "production") {
  logger.add(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  );
}

export default logger;
