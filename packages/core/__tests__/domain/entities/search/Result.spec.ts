import Result from '../../../../src/domain/entities/search/Result';
import {
  DEFAULT_CONTENT,
  DEFAULT_LINK,
  DEFAULT_RESULT
} from '../../../../__mocks__/search/constant';

describe('Result', () => {
  test('equal', () => {
    const other: Result = new Result();
    other.link = DEFAULT_LINK;
    other.content = [DEFAULT_CONTENT];
    expect(DEFAULT_RESULT.equal(other)).toBeTruthy();

    other.link = null as any;
    other.content = [DEFAULT_CONTENT];
    expect(DEFAULT_RESULT.equal(other)).toBeFalsy();

    other.link = DEFAULT_LINK;
    other.content = null as any;
    expect(DEFAULT_RESULT.equal(other)).toBeFalsy();
  });

  test('clone', () => {
    const clone: Result = DEFAULT_RESULT.clone();
    expect(clone.link).toBe(DEFAULT_RESULT.link);
    expect(clone.content).toBe(DEFAULT_RESULT.content);
  });

  test('toString', () => {
    expect(DEFAULT_RESULT.toString()).toBe([
      DEFAULT_RESULT.link,
      DEFAULT_RESULT.content,
    ].join(','));
  });
});
