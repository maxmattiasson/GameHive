declare global {
  namespace Express {
    interface Request {
      validatedBody?: unknown;
    }
  }
}

export {};