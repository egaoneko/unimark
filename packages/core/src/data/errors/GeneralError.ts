import CustomError from '../../error/CustomError';

export default class GeneralError extends CustomError {
  public name = 'GeneralError';

  constructor() {
    super();
  }

  public toString(): string {
    return `[${this.name}]:${this.message}
    ${this.data}`;
  }
}