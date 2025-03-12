import express from "express";
import {
  getMarkets,
  getMarketById,
  getMarketByEvent,
} from "../controllers/marketController.js";

const router = express.Router();
router.route("/").get(getMarkets);
router.route("/event/:eventId").get(getMarketByEvent); // New route to get market by event
router.route("/:id").get(getMarketById);

export { router as marketRoutes };
