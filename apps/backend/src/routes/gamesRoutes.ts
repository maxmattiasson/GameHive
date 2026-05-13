import { Router } from "express";
import getGame from "../middleware/idMiddleware.js";
import {
  getAllGames,
  getGamebyId,
  addNewGame,
  updateGame,
  deleteGame,
  getOwnersGames,
} from "../controllers/gameController.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { requireRole } from "../auth/requireRole.js";
import { canEditGame } from "../middleware/canEditGame.js";
import {
  createGameSchema,
  updateGameSchema,
} from "../schemas/games.schemas.js";
import { validateRequest } from "../middleware/validate.js";
import {
  createReview,
  getAllGamesReviews,
} from "../controllers/reviewController.js";
import {
  gameIdParamsSchema,
  idParamSchema,
} from "../schemas/common.schemas.js";

const router = Router();

// list all games
router.get("/games", getAllGames);

// Get list of games by ownerId (en devs egna games)
router.get(
  "/games/my-games",
  authMiddleware,
  requireRole("dev"),
  getOwnersGames,
);

//GET by id
router.get(
  "/games/:id",
  validateRequest({ params: idParamSchema }),
  getGame,
  getGamebyId,
);

// Add game
router.post(
  "/games",
  authMiddleware,
  requireRole("dev", "admin"),
  validateRequest({ body: createGameSchema }),
  addNewGame,
);

//Patch
//Finds game by id and updates fields sent in the body
router.patch(
  "/games/:id",
  authMiddleware,
  validateRequest({ body: updateGameSchema, params: idParamSchema }),
  getGame,
  canEditGame,
  updateGame,
);

//Delete
router.delete(
  "/games/:id",
  authMiddleware,
  validateRequest({ params: idParamSchema }),
  getGame,
  canEditGame,
  deleteGame,
);

// Reviews on one game
router.get(
  "/games/:gameId/reviews",
  validateRequest({ params: gameIdParamsSchema }),
  getAllGamesReviews,
);

// REVIEWS! Create review on game
router.post(
  "/games/:gameId/reviews",
  authMiddleware,
  validateRequest({ params: gameIdParamsSchema }),
  createReview,
);

// Get all reviews on a game
// router.get("/games/:gameId/review", authMiddleware, getAllGamesReviews)

export default router;
