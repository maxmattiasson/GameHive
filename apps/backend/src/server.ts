import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import rawgRoutes from "./routes/rawgRoutes.js"
import authRoutes from "./auth/authRoutes.js"

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", gamesRoutes);
app.use("/api/rawg", rawgRoutes)
app.use("/api/auth", authRoutes)

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
