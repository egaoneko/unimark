import { ERRORS } from '../../../src/data/errors/errors';
import GeneralError from '../../../src/data/errors/GeneralError';

describe('errors', () => {
  test('ERRORS', () => {
    expect(Object.keys(ERRORS).length).toBe(1);
    expect(ERRORS['general']).toBeInstanceOf(GeneralError);
  });
});
