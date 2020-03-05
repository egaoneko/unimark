import { ApplicationErrorFactory } from '../../../src/data/errors/ApplicationErrorFactory';
import GeneralError from '../../../src/data/errors/GeneralError';
import ErrorType from '../../../src/error/ErrorType';

describe('ApplicationErrorFactory', () => {
  test('getError', () => {
    const factory: ApplicationErrorFactory = new ApplicationErrorFactory();
    const message: string = 'test';
    const data: object = { test: 'test'};
    const error: GeneralError = factory.getError(ErrorType.GENERAL, message, data);
    expect(error.message).toEqual(message);
    expect((error as any).data).toEqual(data);
    expect(error).toBeInstanceOf(GeneralError);
  });

  test('getError without data', () => {
    const factory: ApplicationErrorFactory = new ApplicationErrorFactory();
    const message: string = 'test';
    const error: GeneralError = factory.getError(ErrorType.GENERAL, message);
    expect(error.message).toEqual(message);
    expect((error as any).data).toEqual({});
    expect(error).toBeInstanceOf(GeneralError);
  });

  test('getError unknown type', () => {
    const factory: ApplicationErrorFactory = new ApplicationErrorFactory();
    const message: string = 'test';
    const data: object = { test: 'test'};
    const error: GeneralError = factory.getError(('test' as any), message, data);
    expect(error.message).toEqual(message);
    expect((error as any).data).toEqual(data);
    expect(error).toBeInstanceOf(GeneralError);
  });
});
