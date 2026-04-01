import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
  res.send("funking tjoho");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route OK" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
