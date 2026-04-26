import { Response, NextFunction } from "express"
import { AuthRequest } from "../auth/authMiddleware.js"

export const canEditGame = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const game = res.locals.game;
    
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!game) {
        return res.status(404).json({ message: "Not found"})
    }

    if (user.role === "admin") {
        return next();
      }
    
      if (
        user.role === "dev" &&
        game.ownerUserId &&
        game.ownerUserId.toString() === user.userId
      ) {
        return next();
      }
          return res.status(403).json({ message: "Forbidden" });
    };