import { Role } from '../../src/enums/account/user';
import User, { UserInterface } from '../../src/domain/entities/account/User';
import Setting, {
  AppLayouts,
  SettingInterface
} from '../../src/domain/entities/account/Setting';
import { DEFAULT_UID } from '../constant';

export const DEFAULT_ID: string = 'KpE7RIpfbYQMFAm713eeQNy2oNv1';
export const DEFAULT_NAME: string = 'donghyun.seo91@gmail.com';
export const DEFAULT_EMAIL: string = 'Donghyun Seo';
export const DEFAULT_ROLE: Role = Role.USER;
export const DEFAULT_PHOTO: string = 'https://lh3.googleusercontent.com/a-/AAuE7mByJpaRDgD3vePPsPY7_Em67lncziXtxobBNGvQ';

export const DEFAULT_USER: User = new User(
  DEFAULT_ID,
  DEFAULT_EMAIL,
  DEFAULT_NAME,
  DEFAULT_ROLE
);
DEFAULT_USER.photo = DEFAULT_PHOTO;

export const DEFAULT_USER_JSON: UserInterface = {
  id: DEFAULT_ID,
  email: DEFAULT_EMAIL,
  name: DEFAULT_NAME,
  role: DEFAULT_ROLE,
  photo: DEFAULT_PHOTO,
};

export const DEFAULT_APP_LAYOUTS: AppLayouts = {};

export const DEFAULT_SETTING: Setting = new Setting(DEFAULT_USER);
DEFAULT_SETTING.id = DEFAULT_UID;
DEFAULT_SETTING.layouts = DEFAULT_APP_LAYOUTS;

export const DEFAULT_SETTING_JSON: SettingInterface = {
  id: DEFAULT_UID,
  user: DEFAULT_USER_JSON,
  layouts: DEFAULT_APP_LAYOUTS,
};