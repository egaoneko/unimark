import Bookmark, { BookmarkInterface } from '../../../../src/domain/entities/bookmark/Bookmark';
import BookmarkJSONMapper from '../../../../src/data/mappers/bookmark/BookmarkJSONMapper';
import {
  DEFAULT_BOOKMARK,
  DEFAULT_BOOKMARK_JSON
} from '../../../../__mocks__/bookmark/constant';

describe('BookmarkJSONMapper', () => {
  const mapper: BookmarkJSONMapper = new BookmarkJSONMapper();
  const json: BookmarkInterface = DEFAULT_BOOKMARK_JSON;
  const entity: Bookmark = DEFAULT_BOOKMARK;

  test('toEntity', () => {
    expect(mapper.toEntity(json).equal(entity)).toBeTruthy();
  });

  test('toEntity with wrong json', () => {
    expect(() => mapper.toEntity({} as any)).toThrowError('Invalid json');
  });

  test('toJSON', () => {
    expect(mapper.toJSON(entity)).toEqual(json);
  });
});
