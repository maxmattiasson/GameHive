import express from "express";
import Genre from "../models/Genre.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const genres = await Genre.find().select("_id name slug");
        res.json(genres);
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch genres" });
      }
    });


export default router