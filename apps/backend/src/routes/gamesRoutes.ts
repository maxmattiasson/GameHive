import { Router } from "express";
import Game from "../models/Game.js";

const router = Router();

router.get("/games", async (req, res) => {
  const games = await Game.find();

  res.json(games);
});

export default router;
