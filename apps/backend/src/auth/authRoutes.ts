import { Router } from "express";
import { login, signup, logout } from "./authController.js" 
import { authMiddleware, AuthRequest } from "./authMiddleware.js";
import { checkLoginCount } from "../middleware/achievementMiddleware.js";
import UserModel from "../models/User.js";
import { validateRequest } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import mongoose from "mongoose";
 
const router = Router();

router.post("/login", validateRequest({ body: loginSchema}), login, checkLoginCount, (req, res) => {
  res.status(200).json({
      message: "Login successful",
      user: { ...req.body.user }
  });
});
router.post("/signup", validateRequest({ body: signupSchema }), signup);
router.post("/logout", logout);


// Protected route
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {

    try {
        const userId = req.user?.userId;

        if (!userId) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid user ID" });
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

