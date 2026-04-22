import { Router } from "express";
import {
  getPlayerLibrary,
  addToLibrary,
  updateLibraryEntry
} from "../controllers/libraryController.js";

const router = Router();

// list players library games
router.get("/library", getPlayerLibrary);

// add to players library
router.post("/library", addToLibrary);

// edit players game in library
router.patch("/library/:gameId", updateLibraryEntry);
