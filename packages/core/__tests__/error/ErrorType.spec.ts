import ErrorType from '../../src/error/ErrorType';

describe('ErrorType', () => {
  test('GENERAL', () => {
    expect(ErrorType.GENERAL).toEqual('general');
  });

  test('check size', () => {
    expect(Object.keys(ErrorType).length).toEqual(1);
  });
});
