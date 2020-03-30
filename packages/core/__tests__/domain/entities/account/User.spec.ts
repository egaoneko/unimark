import User from '../../../../src/domain/entities/account/User';
import {
  DEFAULT_EMAIL,
  DEFAULT_ID,
  DEFAULT_NAME,
  DEFAULT_PHOTO,
  DEFAULT_ROLE,
  DEFAULT_USER
} from '../../../../__mocks__/account/constant';

describe('User', () => {
  test('equal', () => {
    const other: User = new User();
    other.id = DEFAULT_ID;
    other.email = DEFAULT_EMAIL;
    other.name = DEFAULT_NAME;
    other.role = DEFAULT_ROLE;
    other.photo = DEFAULT_PHOTO;
    expect(DEFAULT_USER.equal(other)).toBeTruthy();

    other.id = null as any;
    other.email = DEFAULT_EMAIL;
    other.name = DEFAULT_NAME;
    other.role = DEFAULT_ROLE;
    other.photo = DEFAULT_PHOTO;
    expect(DEFAULT_USER.equal(other)).toBeFalsy();

    other.id = DEFAULT_ID;
    other.email = null as any;
    other.name = DEFAULT_NAME;
    other.role = DEFAULT_ROLE;
    other.photo = DEFAULT_PHOTO;
    expect(DEFAULT_USER.equal(other)).toBeFalsy();

    other.id = DEFAULT_ID;
    other.email = DEFAULT_EMAIL;
    other.name = null as any;
    other.role = DEFAULT_ROLE;
    other.photo = DEFAULT_PHOTO;
    expect(DEFAULT_USER.equal(other)).toBeFalsy();

    other.id = DEFAULT_ID;
    other.email = DEFAULT_EMAIL;
    other.name = DEFAULT_NAME;
    other.role = null as any;
    other.photo = DEFAULT_PHOTO;
    expect(DEFAULT_USER.equal(other)).toBeFalsy();

    other.id = DEFAULT_ID;
    other.email = DEFAULT_EMAIL;
    other.name = DEFAULT_NAME;
    other.role = DEFAULT_ROLE;
    other.photo = null as any;
    expect(DEFAULT_USER.equal(other)).toBeFalsy();
  });

  test('clone', () => {
    const clone: User = DEFAULT_USER.clone();
    expect(clone.id).toBe(DEFAULT_USER.id);
    expect(clone.email).toBe(DEFAULT_USER.email);
    expect(clone.name).toBe(DEFAULT_USER.name);
    expect(clone.role).toBe(DEFAULT_USER.role);
    expect(clone.photo).toBe(DEFAULT_USER.photo);
  });

  test('toString', () => {
    expect(DEFAULT_USER.toString()).toBe([
      DEFAULT_USER.id,
      DEFAULT_USER.email,
      DEFAULT_USER.name,
      DEFAULT_USER.role,
      DEFAULT_USER.photo,
    ].join(','));
  });
});
