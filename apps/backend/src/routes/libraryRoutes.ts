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
router.get("/", authMiddleware, getPlayerLibrary);

// add to players library
router.post("/", authMiddleware, addToLibrary);

// edit players game in library
router.patch("/:gameId", authMiddleware, updateLibraryEntry);

// remove game from players library
router.delete("/:gameId", authMiddleware, removeFromLibrary);

export default router;
