import CustomError from '../../src/error/CustomError';

describe('CustomError', () => {
  class ImplementedCustomError extends CustomError {
    constructor() {
      super();
    }

    toString(): string {
      return 'toString is implemented.';
    }
  }

  test('initialize', () => {
    const error: ImplementedCustomError = new ImplementedCustomError();
    const message: string = 'message';
    const data: object = {};
    error.initialize(message, data);
    expect(error.message).toEqual(message);
    expect((error as any).data).toEqual(data);
    expect(() => {
      throw error;
    }).toThrowError('message');
  });
});
