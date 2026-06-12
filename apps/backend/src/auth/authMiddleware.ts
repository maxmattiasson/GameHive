import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../types/userType.js";
import { UnauthorizedError } from "../errors/AppError.js";
import logger from "../logger.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    username: string;
    role: UserRole;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      logger.warn(
        { event: "auth.no_token" },
        "Access denied, no token provided",
      );
      throw new UnauthorizedError("No token provided");
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as {
      userId: string;
      email: string;
      username: string;
      role: UserRole;
    };

    req.user = decoded;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      logger.warn({ event: "auth.token_expired" }, "Token expired");
      return next(new UnauthorizedError("Token expired"));
    }

    if (err instanceof jwt.JsonWebTokenError) {
      logger.warn({ event: "auth.token_invalid" }, "Invalid token");
      return next(new UnauthorizedError("Invalid token"));
    }

    next(err);
  }
};
