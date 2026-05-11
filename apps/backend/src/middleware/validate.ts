export function validate(schema) {
  return (req, res, next) => {
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
    req.validatedBody = result.data;
    next();
  };
}

export function validateRequest(schema) {
  return (req, res, next) => {
    const errors = [];

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
        req.validatedBody = rBody.data;
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
        req.validatedParams = rParams.data;
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
            messahe: issue.message,
          })),
        );
      } else {
        req.validateQuery = rQuery.data;
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation error", errors });
    }

    next();
  };
}
