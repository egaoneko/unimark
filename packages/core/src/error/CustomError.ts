export type ErrorDataType = string | number | object | [] | void | boolean | Error;

export default abstract class CustomError extends Error {
  public name = '';
  protected data: ErrorDataType = {};

  protected constructor() {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  public initialize(message: string, data: ErrorDataType): void {
    this.message = message;
    this.data = data;
  }

  abstract toString(): string;
}
