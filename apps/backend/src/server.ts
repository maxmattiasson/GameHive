import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import rawgRoutes from "./routes/rawgRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import cookieParser from "cookie-parser";
import "./models/Genre.js";
import profileRoutes from "./routes/profileRoutes.js";
import genresRoutes from "./routes/genresRoutes.js"

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", gamesRoutes);

app.use("/api/rawg", rawgRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/genres", genresRoutes)

app.get("/", (req, res) => {
  res.send("funking tjoho");
});

app.use(notFoundMiddleware); // för okända paths
app.use(errorMiddleware); // för fel i routes

async function main() {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

main();
