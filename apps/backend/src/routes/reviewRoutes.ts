import express from "express"
import { authMiddleware } from "../auth/authMiddleware.js";
import { getAllGamesReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllGamesReviews)

export default router