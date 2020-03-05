export type ErrorDataType = string | number | object | [] | void | boolean | Error;

export default abstract class CustomError extends Error {
  public name = '';
  protected data: ErrorDataType = {};

  protected constructor() {
    super();
    Error.captureStackTrace(this, this.constructor);
  }

  initialize(message: string, data: ErrorDataType): void {
    this.message = message;
    this.data = data;
  }

  abstract toString(): string;
}