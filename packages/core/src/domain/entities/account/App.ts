import Entity from '../Entity';
import {
  deepClone,
  equals
} from '../../../utils/common';
import { AppType } from '../../../enums/account/app';

export interface AppInterface<T = any> {
  id: string;
  type: AppType;
  data: T;
}

export default class App<T = any> implements Entity {
  public id!: string;
  public type!: AppType;
  public data!: T;

  public equal(other: App): boolean {
    return equals(this, other);
  }

  public clone(): App {
    const clone: App = new App();
    clone.id = this.id;
    clone.type = this.type;
    clone.data = deepClone<T>(this.data);
    return clone;
  }

  public toString(): string {
    return [
      this.id,
      this.type,
    ].join(',');
  }
}
