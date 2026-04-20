import express from "express";
import { authMiddleware, AuthRequest } from "../auth/authMiddleware.js";
import { requireRole } from "../auth/requireRole.js";

const router = express.Router();

router.get("/", authMiddleware, (req: AuthRequest, res) => {
    console.log("HIT /api/profile");

    res.json({ message: "User profile", user: req.user})
})

router.get("/dev", authMiddleware, requireRole('dev'), (req: AuthRequest, res) => {
    console.log("HIT /api/profile/dev");

    res.json({ message: "dev profile", user: req.user})
})

export default router;