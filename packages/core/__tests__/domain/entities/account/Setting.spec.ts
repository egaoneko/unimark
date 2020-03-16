import Setting from '../../../../src/domain/entities/account/Setting';
import {
  DEFAULT_APP_LAYOUTS,
  DEFAULT_SETTING,
  DEFAULT_USER
} from '../../../../__mocks__/account/constant';
import { DEFAULT_UUID } from '../../../../__mocks__/constant';

describe('Setting', () => {
  test('equal', () => {
    const other: Setting = new Setting();
    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.layouts = DEFAULT_APP_LAYOUTS;
    expect(DEFAULT_SETTING.equal(other)).toBeTruthy();

    other.id = null as any;
    other.user = DEFAULT_USER;
    other.layouts = DEFAULT_APP_LAYOUTS;
    expect(DEFAULT_SETTING.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = null as any;
    other.layouts = DEFAULT_APP_LAYOUTS;
    expect(DEFAULT_SETTING.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.user = DEFAULT_USER;
    other.layouts = null as any;
    expect(DEFAULT_SETTING.equal(other)).toBeFalsy();
  });

  test('clone', () => {
    const clone: Setting = DEFAULT_SETTING.clone();
    expect(clone.id).toBe(DEFAULT_SETTING.id);
    expect(clone.user).toBe(DEFAULT_SETTING.user);
    expect(clone.layouts).toBe(DEFAULT_SETTING.layouts);
  });

  test('toString', () => {
    expect(DEFAULT_SETTING.toString()).toBe([
      DEFAULT_SETTING.id,
      DEFAULT_SETTING.user?.id
    ].join(','));
  });
});
