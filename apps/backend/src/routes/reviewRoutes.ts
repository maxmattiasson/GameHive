import express from "express"
import { authMiddleware } from "../auth/authMiddleware.js";

const router = express.Router();

// Create review on game
router.post("/", authMiddleware, createReview)