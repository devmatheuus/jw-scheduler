import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  public statusCode = 404;

  constructor(message?: string) {
    super(message || 'Route not found');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeErrors() {
    return [{ message: this.message }];
  }
}
