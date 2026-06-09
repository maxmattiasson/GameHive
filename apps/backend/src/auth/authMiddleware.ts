    import { NextFunction, Request, Response } from "express";
    import jwt from "jsonwebtoken";
    import { UserRole } from "../types/userType.js";
    import { UnauthorizedError } from "../errors/AppError.js";

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
        next: NextFunction
      ) => {
        try {
          const token = req.cookies.token;
      
          if (!token) {
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
            return next(new UnauthorizedError("Token expired"));
          }
      
          if (err instanceof jwt.JsonWebTokenError) {
            return next(new UnauthorizedError("Invalid token"));
          }
      
          next(err);
        }
      };