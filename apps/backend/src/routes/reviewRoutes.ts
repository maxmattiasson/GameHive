import express from "express"
import { authMiddleware } from "../auth/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllGamesReviews)
