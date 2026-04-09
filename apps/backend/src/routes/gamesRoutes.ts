import { Router } from "express";
import Game from "../models/Game.js";

const router = Router();

// lista spel med title, genre, created, dev och multiplayer
router.get("/games", async (req, res) => {
  console.log("funkar?");
  try {
    const { title, genre, created, dev, multiplayer } = req.query as {
      title?: string;
      genre?: string;
      created?: string;
      dev?: string;
      multiplayer?: "true" | "false";
    };
    const filter: any = {};

    // matchar sökt, case-insensitive
    if (title) filter.title = { $regex: title, $options: "i" };
    if (genre) filter.genre = { $regex: genre, $options: "i" };
    if (created) filter.created = created;
    if (dev) filter.dev = { $regex: dev, $options: "i" };
    if (multiplayer !== undefined) filter.multiplayer = multiplayer === "true";

    const games = await Game.find(filter);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämntning av spel", error });
  }
});

// Lägg till spel
router.post("/", async (req, res) => {
  console.log("funkar?");

  const game = new Game({
    title: req.body.title,
    created: req.body.created,
    dev: req.body.dev,
    genre: req.body.genre,
    multiplayer: req.body.multiplayer
  });
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: "De gick inte" });
  }
});

// Radera spel via id
router.delete("/games/:id", async (req, res) => {
  console.log("funkar?");

  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);

    if (!deletedGame) {
      return res.status(404).json({ message: "Inget spel hittades" });
    }

    return res
      .status(200)
      .json({ message: "Spelet togs bort", game: deletedGame });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Fel vid borttagning av spel", error });
  }
});

export default router;
