import { Request, Response, NextFunction } from "express";
import Library from "../models/Library.js";

// get all the players games in library
export const getPlayerLibrary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// add to player library
export const addToLibrary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// update playtime and status on library entry(game)
export const updateLibraryEntry = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
