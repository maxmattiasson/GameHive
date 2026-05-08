import { Router } from "express";
import UserModel from "../models/User.js";
import LibraryModel from "../models/Library.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id).select(
    "username role userAchievements createdAt",
  );

  res.json(user);
});

router.get("/:id/library", async (req, res) => {
  const library = await LibraryModel.find({ userId: req.params.id }).populate({
    path: "gameId",
    select: "title thumb dev genres release multiplayer",
    populate: { path: "genres", select: "name" },
  });
  res.json(library);
});

router.get("/:id/achievements", async (req, res) => {
  const user = await UserModel.findById(req.params.id).populate(
    "userAchievements",
  );
  res.json(user?.userAchievements);
});

export default router;
