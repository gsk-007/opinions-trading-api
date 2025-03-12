import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["sports", "politics", "entertainment"],
      required: true,
      index: true,
    },
    odds: {
      yes: { type: Number, required: true },
      no: { type: Number, required: true },
    },
    status: {
      type: String,
      default: "upcoming",
      enum: ["upcoming", "live", "completed"],
      index: true,
    },
    result: {
      type: String,
      default: "pending",
      enum: ["yes", "no", "pending"],
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

eventSchema.index({ eventType: 1, status: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
