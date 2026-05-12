const { AppError } = require("../errors/AppError");

function errorHandler(err, req, res, next) {
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
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
      ...(isDevelopment && { stack: err.stack }),
    });
  }

  // 3. Mongoose ValdationErrror - translated to our format
  if (err.name === "ValidaionError") {
    const errprs = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ message: "Validation error", errors });
  }

  // 4. Mongoose CastError - Invalid objectId Format
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID-Format" });
  }

  // 5. Anything else - unexpected 500 error
  res.status(500).json({
    message: isDevelopment ? err.message : "Unexpected server error",
    ...(isDevelopment && { stack: err.stack }),
  });
}

module.exports = errorHandler;
