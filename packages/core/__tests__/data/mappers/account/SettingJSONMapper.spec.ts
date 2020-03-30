import Setting, { SettingInterface } from '../../../../src/domain/entities/account/Setting';
import SettingJSONMapper from '../../../../src/data/mappers/account/SettingJSONMapper';
import {
  DEFAULT_SETTING,
  DEFAULT_SETTING_JSON
} from '../../../../__mocks__/account/constant';

describe('SettingJSONMapper', () => {
  const mapper: SettingJSONMapper = new SettingJSONMapper();
  const json: SettingInterface = DEFAULT_SETTING_JSON;
  const entity: Setting = DEFAULT_SETTING;

  test('toEntity', () => {
    expect(mapper.toEntity(json).equal(entity)).toBeTruthy();
  });

  test('toEntity with wrong json', () => {
    expect(() => mapper.toEntity({} as any)).toThrowError('Invalid json');
  });

  test('toJSON', () => {
    expect(mapper.toJSON(entity)).toEqual(json);
  });
});
