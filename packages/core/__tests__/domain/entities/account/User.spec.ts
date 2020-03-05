import User from '../../../../src/domain/entities/account/User';
import { Role } from '../../../../src/enums/account';

describe('User', () => {
  test('equal', () => {
    const user: User = new User('0', 'test@test.com', 'Test', Role.USER);
    expect(user.equal(new User('0', 'test@test.com', 'T', Role.USER))).toBeTruthy();
    expect(user.equal(new User('0', 'test@test.com', 'Test', Role.ADMIN))).toBeTruthy();
    expect(user.equal(new User('1', 't@t.com', 'Test', Role.USER))).toBeFalsy();
    expect(user.equal(new User('1', 'test@test.com', 'Test', Role.USER))).toBeFalsy();
  });

  test('clone', () => {
    const user: User = new User('0', 'test@test.com', 'Test', Role.USER);
    user.photo = 'photo';

    const clone: User = user.clone();
    expect(clone.id).toBe(user.id);
    expect(clone.email).toBe(user.email);
    expect(clone.name).toBe(user.name);
    expect(clone.role).toBe(user.role);
    expect(clone.photo).toBe(user.photo);
  });

  test('toString', () => {
    const user: User = new User('0', 'test@test.com', 'Test', Role.USER);
    user.photo = 'photo';

    expect(user.toString()).toBe([
      user.id,
      user.email,
      user.name,
      user.role,
    ].join(','));
  });
});
