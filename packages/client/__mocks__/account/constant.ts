import User, { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import { Role } from '@unimark/core/lib/enums/account/user';

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