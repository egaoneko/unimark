import GeneralError from '../../../src/data/errors/GeneralError';
import CustomError from '../../../src/error/CustomError';

describe('GeneralError', () => {
  test('instance of CustomError', () => {
    const error: GeneralError = new GeneralError();
    expect(error).toBeInstanceOf(CustomError);
  });

  test('toString', () => {
    const error: GeneralError = new GeneralError();
    error.initialize('general error', { data: 'test' });
    expect(error.toString()).toEqual(`[${error.name}]:${error.message}
    ${(error as any).data}`);
  });
});
