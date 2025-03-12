import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    choice: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    odds: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "won", "lost"],
      default: "pending",
    },
    payout: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Trade = mongoose.model("Trade", tradeSchema);

export default Trade;
