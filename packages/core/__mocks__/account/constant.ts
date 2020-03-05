import { Role } from '../../src/enums/account';
import User from '../../src/domain/entities/account/User';

export const DEFAULT_ID: string = 'KpE7RIpfbYQMFAm713eeQNy2oNv1';
export const DEFAULT_NAME: string = 'donghyun.seo91@gmail.com';
export const DEFAULT_EMAIL: string = 'Donghyun Seo';
export const DEFAULT_ROLE: Role = Role.USER;

export const DEFAULT_USER: User = new User(
  DEFAULT_ID,
  DEFAULT_EMAIL,
  DEFAULT_NAME,
  DEFAULT_ROLE
);

DEFAULT_USER.photo = 'https://lh3.googleusercontent.com/a-/AAuE7mByJpaRDgD3vePPsPY7_Em67lncziXtxobBNGvQ';
