import Bookmark, { BookmarkInterface } from '../../src/domain/entities/bookmark/Bookmark';
import {
  DEFAULT_CREATED_AT,
  DEFAULT_UPDATED_AT,
  DEFAULT_UUID
} from '../constant';
import {
  DEFAULT_USER,
  DEFAULT_USER_JSON
} from '../account/constant';
import { BookmarkType } from '../../src/enums/bookmark/type';

export const DEFAULT_ORIGIN_ID: string = DEFAULT_UUID;
export const DEFAULT_URL: string = 'https://examlple.com';
export const DEFAULT_NAME: string = 'example';
export const DEFAULT_TYPE: BookmarkType = BookmarkType.BOOKMARK;
export const DEFAULT_DESCRIPTION: string = 'example description';
export const DEFAULT_ICON: string = 'icon';
export const DEFAULT_ORDER: number = 0;
export const DEFAULT_IS_ROOT: boolean = false;
export const DEFAULT_CHILDREN: Bookmark[] = [];

export const DEFAULT_BOOKMARK: Bookmark = new Bookmark();
DEFAULT_BOOKMARK.id = DEFAULT_UUID;
DEFAULT_BOOKMARK.user = DEFAULT_USER;
DEFAULT_BOOKMARK.originId = DEFAULT_ORIGIN_ID;
DEFAULT_BOOKMARK.url = DEFAULT_URL;
DEFAULT_BOOKMARK.name = DEFAULT_NAME;
DEFAULT_BOOKMARK.type = DEFAULT_TYPE;
DEFAULT_BOOKMARK.description = DEFAULT_DESCRIPTION;
DEFAULT_BOOKMARK.icon = DEFAULT_ICON;
DEFAULT_BOOKMARK.createdAt = DEFAULT_CREATED_AT;
DEFAULT_BOOKMARK.updatedAt = DEFAULT_UPDATED_AT;
DEFAULT_BOOKMARK.order = DEFAULT_ORDER;
DEFAULT_BOOKMARK.isRoot = DEFAULT_IS_ROOT;
DEFAULT_BOOKMARK.children = DEFAULT_CHILDREN;

const clone: Bookmark = DEFAULT_BOOKMARK.clone();
clone.children = [];
DEFAULT_CHILDREN.push(clone);

const DEFAULT_BOOKMARK_CHILDREN_JSON: BookmarkInterface[] = [{
  id: DEFAULT_UUID,
  user: DEFAULT_USER_JSON,
  originId: DEFAULT_ORIGIN_ID,
  url: DEFAULT_URL,
  name: DEFAULT_NAME,
  type: DEFAULT_TYPE,
  description: DEFAULT_DESCRIPTION,
  icon: DEFAULT_ICON,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
  order: DEFAULT_ORDER,
  isRoot: DEFAULT_IS_ROOT,
  children: [],
}];

export const DEFAULT_BOOKMARK_JSON: BookmarkInterface = {
  id: DEFAULT_UUID,
  user: DEFAULT_USER_JSON,
  originId: DEFAULT_ORIGIN_ID,
  url: DEFAULT_URL,
  name: DEFAULT_NAME,
  type: DEFAULT_TYPE,
  description: DEFAULT_DESCRIPTION,
  icon: DEFAULT_ICON,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
  order: DEFAULT_ORDER,
  isRoot: DEFAULT_IS_ROOT,
  children: DEFAULT_BOOKMARK_CHILDREN_JSON,
};


