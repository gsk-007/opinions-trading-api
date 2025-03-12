import Trade from "../models/tradeModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import { tradeValidationSchema } from "../validators/trade.js";
import mongoose from "mongoose";
import Market from "../models/marketModel.js";
import { broadcastTradeUpdate } from "../socket/socket.js";

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

/* @description Create Trade
 * @route POST /api/trades
 * @access Public
 */
const createTrade = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = await tradeValidationSchema.validateAsync(req.body);

    const { event, choice, amount, odds } = validatedData;

    const eventExists = await Event.findById(event);
    if (!eventExists) {
      throw new Error("Event not found");
    }

    if (eventExists.status !== "live") {
      throw new Error(" Trades can only be placed on live events");
    }

    const user = await User.findById(req.user._id).session(session);
    if (user.balance < amount) {
      throw new Error("Insufficient Balance");
    }

    const marketData = await Market.findOne({ event });
    if (choice == "yes") {
      marketData.totalYesBets += amount;
    } else {
      marketData.totalNoBets += amount;
    }
    await marketData.save({ session });
    user.balance -= amount;
    await user.save({ session });

    const trade = await Trade.create(
      [
        {
          user: req.user._id,
          event,
          choice,
          amount,
          odds,
          status: "pending",
        },
      ],
      { session }
    );

    broadcastTradeUpdate("created", trade);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(trade);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error(error.message);
  }
};

/* @description Settle Trades for an event
 * @route GET /api/trades/event/:eventId/settle
 * @access Private(Admin)
 */
const settleTrades = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventId } = req.params;

    // Find the event
    const event = await Event.findById(eventId).session(session);
    if (!event) {
      throw new Error("Event not found");
    }
    if (event.status !== "completed") {
      throw new Error("Event is not marked as completed");
    }
    if (event.result === "pending") {
      throw new Error("Event result is pending");
    }

    const trades = await Trade.find({
      event: eventId,
      status: "pending",
    }).session(session);
    if (!trades.length) {
      throw new Error("No pending trades found for this event");
    }

    for (const trade of trades) {
      const user = await User.findById(trade.user).session(session);
      if (!user) continue;

      let payout = 0;

      if (trade.choice == event.result) {
        payout = trade.amount * trade.odds;

        user.balance += payout;
        trade.payout = payout;
        trade.status = "won";
      } else {
        trade.status = "lost";
      }
      await trade.save({ session });
      await user.save({ session });

      // notify via wesocket
      broadcastTradeUpdate("updated", trade);

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: "Trades settled successfully" });
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error(error.message);
  }
};
export { getTrades, getTradeById, createTrade, settleTrades };
