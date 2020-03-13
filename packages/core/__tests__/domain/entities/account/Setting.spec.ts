import Setting from '../../../../src/domain/entities/account/Setting';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('Setting', () => {
  test('equal', () => {
    const setting: Setting = new Setting(DEFAULT_USER);
    expect(setting.equal(setting)).toBeTruthy();
    expect(setting.equal(new Setting(DEFAULT_USER))).toBeFalsy();
  });

  test('clone', () => {
    const setting: Setting = new Setting(DEFAULT_USER);
    const clone: Setting = setting.clone();
    expect(clone.id).toBe(setting.id);
  });

  test('toString', () => {
    const setting: Setting = new Setting(DEFAULT_USER);
    expect(setting.toString()).toBe([
      setting.id,
      setting.user.id
    ].join(','));
  });
});
