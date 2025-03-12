import Trade from "../models/tradeModel.js";
import Event from "../models/eventModel.js";
import { tradeValidationSchema } from "../validators/trade.js";

/* @description Get all trades for logged in user
 * @route GET /api/trades
 * @access Private
 */
const getTrades = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const totalTrades = await Trade.countDocuments({ user: req.user._id });
  const trades = await Trade.find({ user: req.user._id })
    .populate("user", "name email")
    .populate("event", "eventName eventType status")
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json({
    totalTrades,
    currentPage: parseInt(page),
    totalPage: Math.ceil(totalTrades / limit),
    trades,
  });
};

/* @description Get Trade by Id
 * @route GET /api/trades/:id
 * @access Private
 */
const getTradeById = async (req, res) => {
  const trade = await Trade.findById(req.params.id)
    .populate("user", "name email")
    .populate("event", "eventName eventType status");

  if (!trade) {
    res.status(404);
    throw new Error("Trade not found");
  }

  res.status(200).json(trade);
};

/* @description Get Events
 * @route GET /api/events
 * @access Public
 */
const createTrade = async (req, res) => {
  const validatedData = await tradeValidationSchema.validateAsync(req.body);

  const { event, choice, amount, odds } = validatedData;

  const eventExists = await Event.findById(event);
  if (!eventExists) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (eventExists.status !== "live") {
    res.status(400);
    throw new Error(" Trades can only be placed on live events");
  }

  const trade = await Trade.create({
    user: req.user._id,
    event,
    choice,
    amount,
    odds,
    status: "pending",
  });

  res.status(201).json(trade);
};

export { getTrades, getTradeById, createTrade };
