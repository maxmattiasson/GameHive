import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const isDevelopment = process.env.NODE_ENV === "development";

  // 1. Internal logging - allways verbose
  if (!err.isOperational) {
    console.error("UNEXPECTED ERROR: ", {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack,
    });
  } else {
    console.warn("Application errr: ", {
      method: req.method,
      path: req.path,
      status: err.statusCode,
      message: err.message,
    });
  }

  // 2. Expected application errors - respond with their messages
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
      ...(isDevelopment && { stack: err.stack }),
    });
    return;
  }

  // 3. Mongoose ValdationErrror - translated to our format
  if (err.name === "ValidaionError") {
    const errors = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    res.status(400).json({ message: "Validation error", errors });
    return;
  }

  // 4. Mongoose CastError - Invalid objectId Format
  if (err.name === "CastError") {
    res.status(400).json({ message: "Invalid ID-Format" });
    return;
  }

  // 5. Anything else - unexpected 500 error
  res.status(500).json({
    message: isDevelopment ? err.message : "Unexpected server error",
    ...(isDevelopment && { stack: err.stack }),
  });
}
