import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware.js";
import { Role } from "../types/role.js";

export const requireRole = (...allowedRoles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {

      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      if (!allowedRoles.includes(req.user.role)) {

        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    };
  };