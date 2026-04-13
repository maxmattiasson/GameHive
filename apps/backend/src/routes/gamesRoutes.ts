import { Router } from "express";
import Game from "../models/Game.js";
import getGame from "../middleware/idMiddleware.js";

const router = Router();

// lista alla spel
router.get("/games", async (req, res, next) => {
  console.log("funkar?");
  try {
    const { title, genre, release, dev, multiplayer } = req.query as {
      title?: string;
      genre?: string;
      release?: string;
      dev?: string;
      multiplayer?: "true" | "false";
    };

    const filter: any = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (genre) filter.genres = { $regex: genre, $options: "i" };
    if (release) filter.release = release;
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
    release: req.body.release,
    dev: req.body.dev,
    genres: req.body.genres,
    platforms: req.body.platforms,
    desc: req.body.desc,
    thumb: req.body.thumb,
    multiplayer: req.body.multiplayer,
    avg_rating: req.body.avg_rating,
    review: req.body.review,
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
    if (req.body.release !== undefined) game.release = req.body.release;
    if (req.body.dev !== undefined) game.dev = req.body.dev;
    if (req.body.genres !== undefined) game.genres = req.body.genres;
    if (req.body.platforms !== undefined) game.platforms = req.body.platforms;
    if (req.body.desc !== undefined) game.desc = req.body.desc;
    if (req.body.thumb !== undefined) game.thumb = req.body.thumb;
    if (req.body.multiplayer !== undefined)
      game.multiplayer = req.body.multiplayer;
    if (req.body.avg_rating !== undefined)
      game.avg_rating = req.body.avg_rating;
    if (req.body.review !== undefined) game.review = req.body.review;

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
