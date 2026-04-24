import { Router } from "express";
import {
  getPlayerLibrary,
  addToLibrary,
  updateLibraryEntry,
  removeFromLibrary
} from "../controllers/libraryController.js";
import { authMiddleware } from "../auth/authMiddleware.js";

const router = Router();

// list players library games
router.get("/library", authMiddleware, getPlayerLibrary);

// add to players library
router.post("/library", authMiddleware, addToLibrary);

// edit players game in library
router.patch("/library/:gameId", authMiddleware, updateLibraryEntry);

// remove game from players library
router.delete("/library/:gameId", authMiddleware, removeFromLibrary);

export default router;
