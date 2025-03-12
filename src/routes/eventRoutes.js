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
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getEvents).post(protect, admin, createEvent);
router
  .route("/:id")
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

router.route("/:id/status").patch(protect, admin, updateEventStatus);
router.route("/:id/result").patch(protect, admin, updateEventResult);

export { router as eventRoutes };
