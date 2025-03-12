import express from "express";
import {
  getTrades,
  createTrade,
  getTradeById,
} from "../controllers/tradeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTrades).post(protect, createTrade);
router.route("/:id").get(protect, getTradeById);

export { router as tradeRoutes };
