import Entity from '../Entity';
import User, { UserInterface } from './User';
import { v4 as uuidV4 } from 'uuid';
import { Layouts } from '../../../interfaces/account/setting';

export interface SettingInterface {
  id: string;
  user: UserInterface;
  layouts: AppLayouts
}

export interface AppLayouts {
  [App: string]: Layouts;
}

export default class Setting implements Entity {
  public id: string = uuidV4();
  public layouts: AppLayouts = {};

  constructor(
    public user: User,
  ) {
  }

  public equal(other: Setting): boolean {
    return this.id === other.id;
  }

  public clone(): Setting {
    const setting: Setting = new Setting(this.user);
    setting.id = this.id;
    setting.layouts = this.layouts;
    return setting;
  }

  public toString(): string {
    return [
      this.id,
      this.user.id,
    ].join(',');
  }
}
