import { NextFunction, Response, Request } from "express";

//  middleware som fångar upp alla fel som kastas i routes eller skickas med next, för samma statuskodshantering.
export const errorMiddleware = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
