import Entity from '../Entity';
import { equals } from '../../../utils/common';
import User, { UserInterface } from '../account/User';
import { BookmarkType } from '../../../enums/bookmark/type';

export interface BookmarkInterface {
  id: string;
  user: UserInterface;
  originId?: string;
  url: string;
  name: string;
  type: BookmarkType;
  description?: string;
  icon?: string;
  createdAt: number;
  updatedAt: number;
  order: number;
  isRoot: boolean;
  children?: BookmarkInterface[];
}

export default class Bookmark implements Entity {
  public id!: string;
  public user!: User;
  public originId?: string;
  public url!: string;
  public name!: string;
  public type!: BookmarkType;
  public description?: string;
  public icon?: string;
  public createdAt: number = Date.now();
  public updatedAt: number = Date.now();
  public order: number = 0;
  public isRoot: boolean = false;
  public children?: Bookmark[];

  public equal(other: Bookmark): boolean {
    return equals(this, other);
  }

  public clone(): Bookmark {
    const clone: Bookmark = new Bookmark();
    clone.id = this.id;
    clone.user = this.user;
    clone.originId = this.originId;
    clone.url = this.url;
    clone.name = this.name;
    clone.type = this.type;
    clone.description = this.description;
    clone.icon = this.icon;
    clone.createdAt = this.createdAt;
    clone.updatedAt = this.updatedAt;
    clone.order = this.order;
    clone.isRoot = this.isRoot;
    clone.children = this.children;
    return clone;
  }

  public toString(): string {
    return [
      this.id,
      this.user?.id,
      this.originId,
      this.url,
      this.name,
      this.type,
      this.description,
      this.icon,
      this.createdAt,
      this.updatedAt,
      this.order,
      this.isRoot,
      this.children?.length,
    ].join(',');
  }
}
