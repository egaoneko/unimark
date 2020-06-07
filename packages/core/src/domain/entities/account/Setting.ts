import Entity from '../Entity';
import Serializable from '../../../interfaces/definitions/Serializable';
import User, { UserInterface } from './User';
import { Layouts } from '../../../interfaces/account/setting';
import { equals } from '../../../utils/common';

export interface SettingInterface {
  id: string;
  user: UserInterface;
  layouts: AppLayouts
}

export interface AppLayouts {
  [Platform: string]: Layouts;
}

export default class Setting implements Entity, Serializable {
  public id!: string;
  public user!: User;
  public layouts!: AppLayouts;

  public equal(other: Setting): boolean {
    return equals(this, other);
  }

  public clone(): Setting {
    const setting: Setting = new Setting();
    setting.user = this.user;
    setting.id = this.id;
    setting.layouts = this.layouts;
    return setting;
  }

  public toString(): string {
    return [
      this.id,
      this.user?.id,
    ].join(',');
  }
}
