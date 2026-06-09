import { Router } from "express";
import { login, signup, logout } from "./authController.js" 
import { authMiddleware, AuthRequest } from "./authMiddleware.js";
import { checkLoginCount } from "../middleware/achievementMiddleware.js";
import UserModel from "../models/User.js";
import { validateRequest } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import mongoose from "mongoose";
import {
  UnauthorizedError,
  ValidationError,
  NotFoundError,
} from "../errors/index.js";
import { NextFunction } from "express";

 
const router = Router();

router.post("/login", validateRequest({ body: loginSchema}), login, checkLoginCount, (req, res) => {
  res.status(200).json({
      message: "Login successful",
      user: { ...req.body.user }
  });
});
router.post("/signup", validateRequest({ body: signupSchema }), signup);
router.post("/logout", logout);


// Protected routegit 
router.get("/me", authMiddleware, async (req: AuthRequest, res, next) => {

    try {
        const userId = req.user?.userId;

        if (!userId) {
          throw new UnauthorizedError("Unauthorized");
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new ValidationError("Invalid user ID");
        }
    
        const user = await UserModel.findById(userId).select("-passwordHash");
    
        if (!user) {
          throw new NotFoundError("User not found");
        }
        
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
    });

export default router;

