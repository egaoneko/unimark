import JSONMapper from '../JSONMapper';
import ErrorType from '../../../error/ErrorType';
import Bookmark, { BookmarkInterface } from '../../../domain/entities/bookmark/Bookmark';
import { APPLICATION_ERROR_FACTORY } from '../../errors/factories';
import UserJSONMapper from '../account/UserJSONMapper';

const userMapper: UserJSONMapper = new UserJSONMapper();

export default class BookmarkJSONMapper implements JSONMapper<BookmarkInterface, Bookmark> {
  public toEntity(json: BookmarkInterface): Bookmark {
    if (
      !json.user
    ) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid json');
    }
    const bookmark: Bookmark = new Bookmark();
    bookmark.id = json.id;
    bookmark.user = json.user && userMapper.toEntity(json.user);
    bookmark.originId = json.originId;
    bookmark.url = json.url;
    bookmark.name = json.name;
    bookmark.type = json.type;
    bookmark.description = json.description;
    bookmark.icon = json.icon;
    bookmark.createdAt = json.createdAt;
    bookmark.updatedAt = json.updatedAt;
    bookmark.order = json.order;
    bookmark.isRoot = json.isRoot;
    bookmark.children = json.children?.map((child: BookmarkInterface) => this.toEntity(child));
    return bookmark;
  }

  public toJSON(entity: Bookmark): BookmarkInterface {
    return {
      id: entity.id,
      user: entity.user && userMapper.toJSON(entity.user),
      originId: entity.originId,
      url: entity.url,
      name: entity.name,
      type: entity.type,
      description: entity.description,
      icon: entity.icon,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      order: entity.order,
      isRoot: entity.isRoot,
      children: entity.children?.map((child: Bookmark) => this.toJSON(child)),
    };
  }
}
