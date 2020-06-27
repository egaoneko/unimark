import Query from '../../../../src/domain/entities/search/Query';
import {
  DEFAULT_ENGINE,
  DEFAULT_QUERY,
  DEFAULT_WORD
} from '../../../../__mocks__/search/constant';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('Query', () => {
  test('equal', () => {
    const other: Query = new Query();
    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.user = DEFAULT_USER;
    expect(DEFAULT_QUERY.equal(other)).toBeTruthy();

    other.word = null as any;
    other.engine = DEFAULT_ENGINE;
    other.user = DEFAULT_USER;
    expect(DEFAULT_QUERY.equal(other)).toBeFalsy();

    other.word = DEFAULT_WORD;
    other.engine = null as any;
    other.user = DEFAULT_USER;
    expect(DEFAULT_QUERY.equal(other)).toBeFalsy();

    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.user = null as any;
    expect(DEFAULT_QUERY.equal(other)).toBeFalsy();
  });

  test('clone', () => {
    const clone: Query = DEFAULT_QUERY.clone();
    expect(clone.word).toBe(DEFAULT_QUERY.word);
    expect(clone.engine).toBe(DEFAULT_QUERY.engine);
    expect(clone.user).toBe(DEFAULT_QUERY.user);
  });

  test('toString', () => {
    expect(DEFAULT_QUERY.toString()).toBe([
      DEFAULT_QUERY.word,
      DEFAULT_QUERY.engine,
      DEFAULT_QUERY.user?.id,
    ].join(','));
  });
});
