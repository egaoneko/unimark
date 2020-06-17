import History from '../../../../src/domain/entities/search/History';
import { DEFAULT_UUID } from '../../../../__mocks__/constant';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';
import {
  DEFAULT_CREATED_AT,
  DEFAULT_ENGINE,
  DEFAULT_HISTORY,
  DEFAULT_LINK,
  DEFAULT_UPDATED_AT,
  DEFAULT_WORD
} from '../../../../__mocks__/search/constant';

describe('History', () => {
  test('equal', () => {
    const other: History = new History();
    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.link = DEFAULT_LINK;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    expect(DEFAULT_HISTORY.equal(other)).toBeTruthy();

    other.id = null as any;
    other.user = DEFAULT_USER;
    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.link = DEFAULT_LINK;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    expect(DEFAULT_HISTORY.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = null as any;
    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.link = DEFAULT_LINK;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    expect(DEFAULT_HISTORY.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.word = null as any;
    other.engine = DEFAULT_ENGINE;
    other.link = DEFAULT_LINK;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    expect(DEFAULT_HISTORY.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.word = DEFAULT_WORD;
    other.engine = null as any;
    other.link = DEFAULT_LINK;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    expect(DEFAULT_HISTORY.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.link = null as any;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    expect(DEFAULT_HISTORY.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.link = DEFAULT_LINK;
    other.createdAt = null as any;
    other.updatedAt = DEFAULT_UPDATED_AT;
    expect(DEFAULT_HISTORY.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.word = DEFAULT_WORD;
    other.engine = DEFAULT_ENGINE;
    other.link = DEFAULT_LINK;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = null as any;
    expect(DEFAULT_HISTORY.equal(other)).toBeFalsy();
  });

  test('clone', () => {
    const clone: History = DEFAULT_HISTORY.clone();
    expect(clone.id).toBe(DEFAULT_HISTORY.id);
    expect(clone.user).toBe(DEFAULT_HISTORY.user);
    expect(clone.word).toBe(DEFAULT_HISTORY.word);
    expect(clone.engine).toBe(DEFAULT_HISTORY.engine);
    expect(clone.link).toBe(DEFAULT_HISTORY.link);
    expect(clone.createdAt).toBe(DEFAULT_HISTORY.createdAt);
    expect(clone.updatedAt).toBe(DEFAULT_HISTORY.updatedAt);
  });

  test('toString', () => {
    expect(DEFAULT_HISTORY.toString()).toBe([
      DEFAULT_HISTORY.id,
      DEFAULT_HISTORY.user.id,
      DEFAULT_HISTORY.word,
      DEFAULT_HISTORY.engine,
      DEFAULT_HISTORY.link,
      DEFAULT_HISTORY.createdAt,
      DEFAULT_HISTORY.updatedAt,
    ].join(','));
  });
});
