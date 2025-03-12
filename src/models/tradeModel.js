import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
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
      index: true,
    },
    payout: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

tradeSchema.index({ user: 1, event: 1 });

const Trade = mongoose.model("Trade", tradeSchema);

export default Trade;
