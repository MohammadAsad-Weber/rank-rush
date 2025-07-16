import { Types } from "mongoose";
import type { RequestHandler } from "express";
import { User, ClaimHistory } from "@/models/index.js";
import { createResponse, getPoints } from "@/utilities/index.js";

// Controller
const claimPoints: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    // Check if the ID is valid
    if (!Types.ObjectId.isValid(req.params.id)) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Invalid Fullname — check the provided name and try again",
      });
      return;
    }
    // Check if the user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "User not found — check the provided name and try again",
      });
      return;
    }
    // Claim points and store in database
    const points = getPoints();
    await ClaimHistory.create({
      user: req.params.id,
      pointsClaimed: points,
    });
    // Update the user's points
    await User.findByIdAndUpdate(req.params.id, { $inc: { points } });

    // Send the success response
    createResponse(res).send({
      status: "OK",
      status_code: 200,
      message: `Successfully claimed ${points} point${points === 1 ? "" : "s"}`,
    });
  } catch (error) {
    next(error);
  }
};

export default claimPoints;
