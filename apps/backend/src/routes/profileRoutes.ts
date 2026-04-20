import express from "express";
import { authMiddleware, AuthRequest } from "../auth/authMiddleware.js";
import { requireRole } from "../auth/requireRole.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req: AuthRequest, res) => {
    res.json({ message: "User profile", user: req.user})
})

router.get("/dev/profile", authMiddleware, requireRole('dev'), (req: AuthRequest, res) => {
    res.json({ message: "dev profile", user: req.user})
})

export default router;