import {
  apply,
  equals,
  lets,
  uuid
} from '../../src/utils/common';

describe('common utils', () => {
  test('apply', () => {
    const target: object = {};
    const applier: (target: object) => void = jest.fn();
    expect(apply<object>(target, applier)).toBe(target);
    expect(applier).toBeCalledTimes(1);
    expect(applier).toBeCalledWith(target);
  });

  test('lets', () => {
    const target: object = {};
    const ret: object = {};
    const player: (target: object) => object = jest.fn().mockImplementation((target: object): object => ret);
    expect(lets<object, object>(target, player)).toBe(ret);
    expect(player).toBeCalledTimes(1);
    expect(player).toBeCalledWith(target);
  });

  test('uuid', () => {
    expect(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(uuid())).toBeTruthy();
  });

  test('equals', () => {
    const a: object = { a: 1, b: 2, c: 3 };
    const b: object = { a: 1, b: 2, c: 3 };
    const c: object = { a: 1, b: 2 };
    expect(equals(a, b)).toBeTruthy();
    expect(equals(a, c)).toBeFalsy();
  });
});
