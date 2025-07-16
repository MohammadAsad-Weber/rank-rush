import { User } from "@/models/index.js";
import type { RequestHandler } from "express";
import { createResponse } from "@/utilities/index.js";
import type { CreateUserType } from "@/validators/index.js";

// Controller
const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Destructure the req.body
    const { fullname } = req.body as CreateUserType;

    // Check if the user already exists
    const user = await User.findOne({ fullname });
    if (user) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "A user with the same full name already exists",
      });
      return;
    }
    // Store the user in database
    await User.create({ fullname });

    // Send the success response
    createResponse(res).send({
      status: "Created",
      status_code: 201,
      message: "User has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default createUser;
