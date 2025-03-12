import express from "express";
import {
  getTrades,
  createTrade,
  getTradeById,
  settleTrades,
} from "../controllers/tradeController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTrades).post(protect, createTrade);
router.route("/:id").get(protect, getTradeById);
router.route("/event/:eventId/settle").post(protect, admin, settleTrades);

export { router as tradeRoutes };
