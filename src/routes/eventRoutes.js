import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  updateEventStatus,
  updateEventResult,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getEvents).post(protect, createEvent);
router
  .route("/:id")
  .get(getEventById)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

router.route("/:id/status").patch(protect, updateEventStatus);
router.route("/:id/result").patch(protect, updateEventResult);

export { router as eventRoutes };
