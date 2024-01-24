import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

type FormattedError = {
  message: string;
  field?: string;
};

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeErrors() {
    const formattedErrors = this.errors.map((error) => {
      const formattedError: FormattedError = { message: error.msg };

      if (error.type === 'field') {
        formattedError.field = error.path;
      }

      return formattedError;
    });

    return formattedErrors;
  }
}
