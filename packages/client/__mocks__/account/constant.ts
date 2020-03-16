import User, { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import { Role } from '@unimark/core/lib/enums/account/user';
import Setting, {
  AppLayouts,
  SettingInterface
} from '@unimark/core/lib/domain/entities/account/Setting';
import { DEFAULT_UUID } from '@unimark/core/__mocks__/constant';

export const DEFAULT_ID: string = 'KpE7RIpfbYQMFAm713eeQNy2oNv1';
export const DEFAULT_NAME: string = 'donghyun.seo91@gmail.com';
export const DEFAULT_EMAIL: string = 'Donghyun Seo';
export const DEFAULT_ROLE: Role = Role.USER;
export const DEFAULT_PHOTO: string = 'https://lh3.googleusercontent.com/a-/AAuE7mByJpaRDgD3vePPsPY7_Em67lncziXtxobBNGvQ';

export const DEFAULT_USER: User = new User();
DEFAULT_USER.id = DEFAULT_ID;
DEFAULT_USER.email = DEFAULT_EMAIL;
DEFAULT_USER.name = DEFAULT_NAME;
DEFAULT_USER.role = DEFAULT_ROLE;
DEFAULT_USER.photo = DEFAULT_PHOTO;

export const DEFAULT_USER_JSON: UserInterface = {
  id: DEFAULT_ID,
  email: DEFAULT_EMAIL,
  name: DEFAULT_NAME,
  role: DEFAULT_ROLE,
  photo: DEFAULT_PHOTO,
};

export const DEFAULT_APP_LAYOUTS: AppLayouts = {};

export const DEFAULT_SETTING: Setting = new Setting();
DEFAULT_SETTING.id = DEFAULT_UUID;
DEFAULT_SETTING.user = DEFAULT_USER;
DEFAULT_SETTING.layouts = DEFAULT_APP_LAYOUTS;

export const DEFAULT_SETTING_JSON: SettingInterface = {
  id: DEFAULT_UUID,
  user: DEFAULT_USER_JSON,
  layouts: DEFAULT_APP_LAYOUTS,
};