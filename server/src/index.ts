// Side-Effect Import
import "dotenv/config.js";

// External Libraries
import cors from "cors";
import helmet from "helmet";
import express from "express";

// Utilities
import { connectDB, createResponse } from "./utilities/index.js";

// Error Handling Middleware
import { errorHandler } from "./middleware/index.js";

// Route Handlers and Controllera
import userHandler from "./routes/user.route.js";
import { claimPoints, getLeaderboard } from "./controllers/index.js";

// Constant Variables
const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB(process.env.MONGODB_URL || "");

// Enable trust proxy
app.set("trust proxy", 1);

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

// API Routes
app.use("/api/user", userHandler);
app.post("/api/points/:id", claimPoints);
app.get("/api/leaderboard", getLeaderboard);

// Fallback route for unhandled endpoints
app.use((req, res) => {
  createResponse(res).send({
    status: "Not Found",
    status_code: 404,
    message: `The URL "${req.originalUrl}" could not be located`,
  });
});
// Error handling middleware
app.use(errorHandler);

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
