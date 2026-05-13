// Base class for all expeted application errors

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: any[];

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true; // Differ appliction errors from programtic errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 - Validation error, faulty in-data

export class ValidationError extends AppError {
  errors: any[];

  constructor(message: string = "Validation Erorr", errors: any[] = []) {
    super(message, 400);
    this.errors = errors;
  }
}

// 401 - Authorization is required (useable in week 7)

export class UnauthorizedError extends AppError {
  errors: any[];

  constructor(
    message: string = "Authorization is required",
    errors: any[] = [],
  ) {
    super(message, 401);
    this.errors = errors;
  }
}

// 403 - Access Denied (usable in week 7)

export class ForbiddenError extends AppError {
  constructor(message: string = "Access Denied") {
    super(message, 403);
  }
}

// 404 - Not found

export class NotFoundError extends AppError {
  constructor(message: string = "The resource could not be located") {
    super(message, 404);
  }
}

// 409 - Conflict Error
export class ConflictError extends AppError {
  constructor(message: string = "The resource is already present") {
    super(message, 409);
  }
}
