import { Router } from "express";
import Game from "../models/Game.js";

const router = Router();

router.get("/games", async (req, res) => {
  const games = await Game.find();

  res.json(games);
});

// sök efter spel med title
router.get("/games/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    // hitta titlar som matchar title sökt, case-insensitive
    const game = await Game.findOne({
      title: { $regex: title, $options: "i" },
    });

    if (!game) {
      return res
        .status(404)
        .json({ message: "Inget spel med den titeln hittades." });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämntning av spel", error });
  }
});

export default router;
