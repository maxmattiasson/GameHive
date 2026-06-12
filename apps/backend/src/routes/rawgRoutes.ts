import { Router } from "express";
import logger from "../logger.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const search = (req.query.search as string) || "skyrim";

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${search}`,
    );

    if (!response.ok) {
      throw new Error("failed fetch of rawg");
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    logger.error({ err }, "rawg error:");
    res.status(500).json({ message: "RAWG fetch failed" });
  }
});

export default router;
