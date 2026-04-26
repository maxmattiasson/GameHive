    import { NextFunction, Request, Response } from "express";
    import jwt from "jsonwebtoken";
    import { Role } from "../types/role.js";

    export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        username: string;
        role: Role;
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
                return res.status(401).json({ message: "No token provided" });
            }

        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is not defined");

        const decoded = jwt.verify(token, secret) as {
            userId: string;
            email: string;
            username: string;
            role: Role;
          };

        req.user = decoded;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
          }
          return res.status(401).json({ message: "Invalid token" });
    }
    };