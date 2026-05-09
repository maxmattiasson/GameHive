import { Router } from "express";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";
import mongoose from "mongoose";

const router = Router();

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const user = await UserModel.findById(req.params.id).select(
    "username role userAchievements createdAt",
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

router.get("/:id/library", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const library = await LibraryModel.find({ userId: req.params.id }).populate({
    path: "gameId",
    select: "title thumb dev genres release multiplayer",
    populate: { path: "genres", select: "name" },
  });

  res.json(library);
});

router.get("/:id/achievements", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  const user = await UserModel.findById(req.params.id).populate(
    "userAchievements",
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user.userAchievements);
});

export default router;
