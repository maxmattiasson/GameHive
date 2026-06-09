import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware.js";
import { Role } from "../types/role.js";
import {
  UnauthorizedError,
  ForbiddenError,
} from "../errors/index.js";

export const requireRole = (...allowedRoles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {

      if (!req.user) {
        throw new UnauthorizedError("Not authenticated");
      }
  
      if (!allowedRoles.includes(req.user.role)) {

        throw new ForbiddenError("Forbidden");
      }

      next();
    };
  };