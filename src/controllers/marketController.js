import Market from "../models/marketModel.js";
import Event from "../models/eventModel.js";

/* @description Get Market Data
 * @route GET /api/markets
 * @access Private
 */
const getMarkets = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const totalMarkets = await Market.countDocuments();
  const markets = await Market.find()
    .populate("event", "eventName status")
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    totalMarkets,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalMarkets / limit),
    markets,
  });
};

/* @description Get Market Data By Id
 * @route GET /api/markets/:id
 * @access Private
 */
const getMarketById = async (req, res) => {
  const market = await Market.findById(req.params.id).populate(
    "event",
    "eventName status"
  );

  if (!market) {
    res.status(404);
    throw new Error("Market Details not found");
  }

  res.status(200).json(market);
};

/* @description Get Market Data By EventId
 * @route GET /api/markets/event/:eventId
 * @access Private
 */
const getMarketByEvent = async (req, res) => {
  const { eventId } = req.params;

  const market = await Market.findOne({ event: eventId }).populate(
    "event",
    "eventName status"
  );

  if (!market) {
    res.status(404);
    throw new Error("Market data not found for this event");
  }

  res.status(200).json(market);
};

export { getMarkets, getMarketById, getMarketByEvent };
