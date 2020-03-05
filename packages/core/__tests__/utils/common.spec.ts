import {
  apply,
  lets
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
});
