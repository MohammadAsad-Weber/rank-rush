import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your full name"],
      minlength: [3, "Fullname must be at least 3 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
      trim: true,
      unique: true,
    },
    points: {
      type: Number,
      default: 0,
      min: [0, "Points cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

// To optimize sorting for leaderboard
userSchema.index({ fullname: 1, points: -1 });

const User = model("User", userSchema);
export default User;
