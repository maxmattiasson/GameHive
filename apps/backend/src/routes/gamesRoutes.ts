import { Router } from "express";
import getGame from "../middleware/idMiddleware.js";
import {
  getAllGames,
  getGamebyId,
  addNewGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { requireRole } from "../auth/requireRole.js";
import { canEditGame } from "../middleware/canEditGame.js";

const router = Router();

// list all games
router.get("/games", getAllGames);

//GET by id
router.get("/games/:id", getGame, getGamebyId);

// Add game
router.post("/games", authMiddleware, requireRole("dev", "admin"), addNewGame);

//Patch
//Finds game by id and updates fields sent in the body
router.patch("/games/:id", authMiddleware, getGame, canEditGame, updateGame);

//Delete
router.delete("/games/:id", authMiddleware, getGame, canEditGame, deleteGame);

export default router;
