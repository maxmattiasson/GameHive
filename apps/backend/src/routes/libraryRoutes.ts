import { Router } from "express";
import {
  getPlayerLibrary,
  addToLibrary,
  updateLibraryEntry,
  removeFromLibrary
} from "../controllers/libraryController.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { validateRequest } from "../middleware/validate.js";
import { addToLibrarySchema, updateLibraryEntrySchema } from "../schemas/library.schemas.js";
import { gameIdParamsSchema } from "../schemas/common.schemas.js";

const router = Router();

// list players library games
router.get("/", authMiddleware, getPlayerLibrary);

// add to players library
router.post("/", authMiddleware, validateRequest({body: addToLibrarySchema}), addToLibrary);

// edit players game in library
router.patch("/:gameId", authMiddleware, validateRequest({body: updateLibraryEntrySchema, params: gameIdParamsSchema}), updateLibraryEntry);

// remove game from players library
router.delete("/:gameId", authMiddleware, validateRequest({ params: gameIdParamsSchema}), removeFromLibrary);

export default router;
