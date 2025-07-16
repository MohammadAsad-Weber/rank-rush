import { User } from "@/models/index.js";
import type { RequestHandler } from "express";
import { createResponse } from "@/utilities/index.js";

// Controller
const getUsers: RequestHandler = async (_, res, next) => {
  try {
    // Get all the users
    const users = await User.find()
      .select("-updatedAt -__v")
      .lean()
      .sort({ fullname: 1 });

    // Send the array of users with response
    createResponse(res).send<{ users: typeof users }>({
      status: "OK",
      status_code: 200,
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

export default getUsers;
