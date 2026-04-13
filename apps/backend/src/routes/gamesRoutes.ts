import { Router } from "express";
import Game from "../models/Game.js";
import getGame from "../middleware/idMiddleware.js";
import {
  getAllGames,
  getGamebyId,
  addNewGame,
} from "../controllers/gameController.js";

const router = Router();

// list all games
router.get("/games", getAllGames);

//GET by ID
router.get("/games/:id", getGame, getGamebyId);

// Add game
router.post("/games", addNewGame);

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
