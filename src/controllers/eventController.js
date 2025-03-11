import Event from "../models/eventModel.js";
import { eventValidationSchema } from "../validators/event.js";

/* @description Get Events
 * @route GET /api/events
 * @access Public
 */
const getEvents = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = {};

  if (status) {
    if (!["upcoming", "live", "completed"].includes(status)) {
      res.status(400);
      throw new Error("Invalid status filter");
    }
    query.status = status;
  }

  const totalEvents = await Event.countDocuments(query);
  const events = await Event.find(query)
    .sort({ startTime: 1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json({
    totalEvents,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalEvents / limit),
    events,
  });
};

/* @description Get Event by id
 * @route GET /api/events/:id
 * @access Public
 */
const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json(event);
};

/* @description Create a new event
 * @route POST /api/events
 * @access Private(Admin)
 */
const createEvent = async (req, res) => {
  const validatedData = await eventValidationSchema.validateAsync(req.body);

  const { eventName, eventType, odds, status, result, startTime, endTime } =
    validatedData;

  const event = await Event.create({
    eventName,
    eventType,
    odds,
    status,
    result,
    startTime,
    endTime,
  });

  res.status(201).json(event);
};

/* @description Update an Event by id
 * @route PUT /api/events/:id
 * @access Private(Admin)
 */
const updateEvent = async (req, res) => {
  const validatedData = await eventValidationSchema.validateAsync(req.body);
  console.log(validatedData);

  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  event.eventName = validatedData.eventName || event.eventName;
  event.eventType = validatedData.eventType || event.eventType;
  event.odds = validatedData.odds || event.odds;
  event.startTime = validatedData.startTime || event.startTime;
  event.endTime = validatedData.endTime || event.endTime;

  const updatedEvent = await event.save();
  res.status(200).json(updatedEvent);
};

/* @description Update event status (upcoming, live, completed)
 * @route PATCH /api/events/:id/status
 * @access Private(Admin)
 */
const updateEventStatus = async (req, res) => {
  const { status } = req.body;

  if (!["upcoming", "live", "completed"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  event.status = status;
  await event.save();

  res.status(200).json({ message: "Event status updated", event });
};

/* @description Update event result (yes, no, pending)
 * @route PATCH /api/events/:id/result
 * @access Private(Admin)
 */
const updateEventResult = async (req, res) => {
  const { result } = req.body;

  if (!["yes", "no", "pending"].includes(result)) {
    res.status(400);
    throw new Error("Invalid result value");
  }

  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (event.status !== "completed") {
    res.status(400);
    throw new Error("Results can only be set for completed events");
  }

  event.result = result;
  await event.save();

  res.status(200).json({ message: "Event result updated", event });
};

/* @description Delete an Event
 * @route DELETE /api/events/:id
 * @access Private(Admin)
 */
const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.deleteOne();
  res.status(200).json({ message: "Event removed" });
};

export {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  updateEventStatus,
  updateEventResult,
  deleteEvent,
};
