import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation Erorr",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    // Save the validate data for route handler
    (req as any).validatedBody = result.data;
    next();
  };
}

interface RequestSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export function validateRequest(schema: RequestSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any[] = [];

    if (schema.body) {
      const rBody = schema.body.safeParse(req.body);

      if (!rBody.success) {
        errors.push(
          ...rBody.error.issues.map((issue) => ({
            location: "body",
            field: issue.path.join("."),
            message: issue.message,
          })),
        );
      } else {
        (req as any).validatedBody = rBody.data;
      }
    }
    // E.g /api/v1/products/:id
    if (schema.params) {
      const rParams = schema.params.safeParse(req.params);

      if (!rParams.success) {
        errors.push(
          ...rParams.error.issues.map((issue) => ({
            location: "params",
            field: issue.path.join("."),
            message: issue.message,
          })),
        );
      } else {
        (req as any).validatedParams = rParams.data;
      }
    }
    // E.g /api/v1/products?name=laptop&category=electronics
    if (schema.query) {
      const rQuery = schema.query.safeParse(req.query);

      if (!rQuery.success) {
        errors.push(
          ...rQuery.error.issues.map((issue) => ({
            location: "query",
            field: issue.path.join("."),
            message: issue.message,
          })),
        );
      } else {
        (req as any).validatedQuery = rQuery.data;
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation error", errors });
    }

    next();
  };
}
