import { User } from "@/models/index.js";
import type { RequestHandler } from "express";
import { createResponse } from "@/utilities/index.js";

// Controller
const getLeaderboard: RequestHandler = async (_, res, next) => {
  try {
    // Get all the users
    const users = await User.find({ points: { $gt: 0 } })
      .select("-createdAt -updatedAt -__v")
      .lean()
      .sort({ points: -1 });

    // Provide rank to the users
    const result = users.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
    // Send the result alongside response
    createResponse(res).send<{ result: typeof result }>({
      status: "OK",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

export default getLeaderboard;
