import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchPercent: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "matched", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);
