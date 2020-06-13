import Entity from '../Entity';
import {
  deepClone,
  equals
} from '../../../utils/common';
import { AppType } from '../../../enums/account/app';
import User, { UserInterface } from './User';

export interface AppInterface {
  id: string;
  user: UserInterface;
  type: AppType;
  data: any;
}

export default class App implements Entity {
  public id!: string;
  public user!: User;
  public type!: AppType;
  public data: any = {};

  public equal(other: App): boolean {
    return equals(this, other);
  }

  public clone(): App {
    const clone: App = new App();
    clone.id = this.id;
    clone.user = this.user;
    clone.type = this.type;
    clone.data = deepClone(this.data);
    return clone;
  }

  public toString(): string {
    return [
      this.id,
      this.user?.id,
      this.type,
    ].join(',');
  }
}
