import logger from "./logger.js";
// Global error handlers för att fånga oväntade fel
process.on("uncaughtException", (err) => {
  logger.error({ err }, "Uncaught Exception:");
});
process.on("unhandledRejection", (err) => {
  logger.error({ err }, "Unhandled Rejection");
});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/authRoutes.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import friendshipRoutes from "./routes/friendshipRoutes.js";
import achievementsRoutes from "./routes/achievementsRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import genresRoutes from "./routes/genresRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import rawgRoutes from "./routes/rawgRoutes.js";

import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json" with { type: "json" };

import "./models/Genre.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";

import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRoutes);

app.use("/api", gamesRoutes);
app.use("/api/library", libraryRoutes);

app.use("/api/rawg", rawgRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/friends", friendshipRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req, res) => {
  res.send("funking tjoho");
});

app.use(notFoundMiddleware); // för okända paths
app.use(errorMiddleware); // för fel i routes

export default app;
