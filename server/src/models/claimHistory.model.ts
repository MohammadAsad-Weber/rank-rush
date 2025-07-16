import { Schema, model, Types } from "mongoose";

const claimHistorySchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    pointsClaimed: {
      type: Number,
      required: true,
      min: [1, "Minimum claim is 1 point"],
      max: [10, "Maximum claim is 10 points"],
    },
  },
  {
    timestamps: true,
  }
);

const ClaimHistory = model("ClaimHistory", claimHistorySchema);
export default ClaimHistory;
