import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware.js";
import { Role } from "../types/role.js";

export const requireRole = (...allowedRoles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        console.log("requireRole running");
        console.log("allowedRoles:", allowedRoles);
        console.log("req.user:", req.user);

      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        console.log("FORBIDDEN");

        return res.status(403).json({ message: "Forbidden" });
      }
      console.log("ALLOWED");

      next();
    };
  };