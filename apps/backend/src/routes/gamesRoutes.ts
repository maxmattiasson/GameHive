import { Router } from "express";
import Game from "../models/Game.js";
import getGame from "../middleware/idMiddleware.js";

const router = Router();

// lista alla spel med title, genre, created, dev och multiplayer
router.get("/games", async (req, res, next) => {
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
    next(error);
  }
});

// GET:Id
// Sök spel med mongo id
router.get("/games/:id", getGame, (req, res) => {
  console.log("hallåhej");

  return res.status(200).json(res.locals.game);
});

// Lägg till spel
router.post("/games", async (req, res, next) => {
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
    next(error);
  }
});

// PATCH
//Hämtar spel med id, uppdaterar fält som skickas in i body.
router.patch("/games/:id", getGame, async (req, res, next) => {
  try {
    const game = res.locals.game;

    if (req.body.title !== undefined) game.title = req.body.title;
    if (req.body.created !== undefined) game.created = req.body.created;
    if (req.body.dev !== undefined) game.dev = req.body.dev;
    if (req.body.genre !== undefined) game.genre = req.body.genre;
    if (req.body.multiplayer !== undefined)
      game.multiplayer = req.body.multiplayer;

    const updatedGame = await game.save();
    return res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
});

// Radera spel via id
router.delete("/games/:id", getGame, async (req, res, next) => {
  try {
    const game = res.locals.game;
    await game.deleteOne();
    return res.status(200).json({ message: "Spelet togs bort", game });
  } catch (error) {
    next(error);
  }
});

export default router;