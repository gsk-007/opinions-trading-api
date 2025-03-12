import mongoose from "mongoose";

const marketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    totalYesBets: {
      type: Number,
      default: 0,
    },
    totalNoBets: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Market = mongoose.model("Market", marketSchema);

export default Market;
