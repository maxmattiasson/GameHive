import { Router } from "express";
import getGame from "../middleware/idMiddleware.js";
import {
  getAllGames,
  getGamebyId,
  addNewGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";

const router = Router();

// list all games
router.get("/games", getAllGames);

//GET by id
router.get("/games/:id", getGame, getGamebyId);

// Add game
router.post("/games", addNewGame);

//Patch
//Finds game by id and updates fields sent in the body
router.patch("/games/:id", getGame, updateGame);

//Delete
router.delete("/games/:id", getGame, deleteGame);

export default router;
