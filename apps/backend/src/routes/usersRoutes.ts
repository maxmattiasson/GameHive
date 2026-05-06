import { Router } from "express";
import UserModel from "../models/User.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id).select(
    "username role userAchievements createdAt",
  );

  res.json(user);
});

export default router;
