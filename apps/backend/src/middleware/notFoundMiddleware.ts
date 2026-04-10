import { Response, Request } from "express";

// middleware som fångar upp not found som kastas i routes eller skickas med next, för samma statuskodshantering.
export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({
    message: "Endpoint not found"
  });
};
