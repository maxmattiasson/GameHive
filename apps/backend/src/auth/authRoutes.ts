import { Router } from "express";
import { login, signup } from "./authController.js" 
import { authMiddleware, AuthRequest } from "./authMiddleware.js";
import UserModel from "../models/User.js";
 
const router = Router();

router.post("/login", login);
router.post("/signup", signup);

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.userId;
    
        if (!userId) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
    
        const user = await UserModel.findById(userId).select("-passwordHash");
    
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }
    
        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    });
    
export default router;

