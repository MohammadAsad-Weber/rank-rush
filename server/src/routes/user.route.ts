import express from "express";
import { validate } from "@/middleware/index.js";
import { CreateUserSchema } from "@/validators/index.js";
import { createUser, getUsers } from "@/controllers/index.js";

// Express Router
const router = express.Router();

// Routes
router.get("/", getUsers);
router.post("/", validate(CreateUserSchema), createUser);

export default router;
