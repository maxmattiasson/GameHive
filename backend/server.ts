import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("funking");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route OK" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});