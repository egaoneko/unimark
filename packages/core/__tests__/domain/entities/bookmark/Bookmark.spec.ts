import Bookmark from '../../../../src/domain/entities/bookmark/Bookmark';
import {
  DEFAULT_BOOKMARK,
  DEFAULT_CHILDREN,
  DEFAULT_DESCRIPTION,
  DEFAULT_ICON,
  DEFAULT_IS_ROOT,
  DEFAULT_NAME,
  DEFAULT_ORDER,
  DEFAULT_ORIGIN_ID,
  DEFAULT_TYPE,
  DEFAULT_URL
} from '../../../../__mocks__/bookmark/constant';
import {
  DEFAULT_CREATED_AT,
  DEFAULT_UPDATED_AT,
  DEFAULT_UUID
} from '../../../../__mocks__/constant';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('Bookmark', () => {
  test('equal', () => {
    const other: Bookmark = new Bookmark();
    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeTruthy();

    other.id = null as any;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = null as any;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = null as any;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = null as any;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = null as any;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = null as any;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = null as any;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = null as any;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = null as any;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = null as any;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = null as any;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = null as any;
    other.children = DEFAULT_CHILDREN;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.originId = DEFAULT_ORIGIN_ID;
    other.url = DEFAULT_URL;
    other.name = DEFAULT_NAME;
    other.type = DEFAULT_TYPE;
    other.description = DEFAULT_DESCRIPTION;
    other.icon = DEFAULT_ICON;
    other.createdAt = DEFAULT_CREATED_AT;
    other.updatedAt = DEFAULT_UPDATED_AT;
    other.order = DEFAULT_ORDER;
    other.isRoot = DEFAULT_IS_ROOT;
    other.children = null as any;
    expect(DEFAULT_BOOKMARK.equal(other)).toBeFalsy();
  });

  test('clone', () => {
    const clone: Bookmark = DEFAULT_BOOKMARK.clone();
    expect(clone.id).toBe(DEFAULT_BOOKMARK.id);
    expect(clone.user).toBe(DEFAULT_BOOKMARK.user);
    expect(clone.originId).toBe(DEFAULT_BOOKMARK.originId);
    expect(clone.url).toBe(DEFAULT_BOOKMARK.url);
    expect(clone.name).toBe(DEFAULT_BOOKMARK.name);
    expect(clone.type).toBe(DEFAULT_BOOKMARK.type);
    expect(clone.description).toBe(DEFAULT_BOOKMARK.description);
    expect(clone.icon).toBe(DEFAULT_BOOKMARK.icon);
    expect(clone.createdAt).toBe(DEFAULT_BOOKMARK.createdAt);
    expect(clone.updatedAt).toBe(DEFAULT_BOOKMARK.updatedAt);
    expect(clone.order).toBe(DEFAULT_BOOKMARK.order);
    expect(clone.isRoot).toBe(DEFAULT_BOOKMARK.isRoot);
    expect(clone.children).toBe(DEFAULT_BOOKMARK.children);
  });

  test('toString', () => {
    expect(DEFAULT_BOOKMARK.toString()).toBe([
      DEFAULT_BOOKMARK.id,
      DEFAULT_BOOKMARK.user?.id,
      DEFAULT_BOOKMARK.originId,
      DEFAULT_BOOKMARK.url,
      DEFAULT_BOOKMARK.name,
      DEFAULT_BOOKMARK.type,
      DEFAULT_BOOKMARK.description,
      DEFAULT_BOOKMARK.icon,
      DEFAULT_BOOKMARK.createdAt,
      DEFAULT_BOOKMARK.updatedAt,
      DEFAULT_BOOKMARK.order,
      DEFAULT_BOOKMARK.isRoot,
      DEFAULT_BOOKMARK.children?.length,
    ].join(','));
  });
});
