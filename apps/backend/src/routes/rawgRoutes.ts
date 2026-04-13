import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const search = (req.query.search as string) || "skyrim"

        const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${search}`)

        if (!response.ok) {
            throw new Error("failed fetch of rawg")
        }
        const data = await response.json();
        res.json(data)

    } catch (err) {
        console.error("rawg error:", err);
        res.status(500).json({ message: "RAWG fetch failed" });
    }

})

export default router
