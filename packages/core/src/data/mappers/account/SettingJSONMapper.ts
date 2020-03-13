import JSONMapper from '../JSONMapper';
import ErrorType from '../../../error/ErrorType';
import Setting, { SettingInterface } from '../../../domain/entities/account/Setting';
import { APPLICATION_ERROR_FACTORY } from '../../errors/factories';
import UserJSONMapper from './UserJSONMapper';

const userMapper: UserJSONMapper = new UserJSONMapper();

export default class SettingJSONMapper implements JSONMapper<SettingInterface, Setting> {
  public toEntity(json: SettingInterface): Setting {
    if (
      !json.user
    ) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid json');
    }
    const setting: Setting = new Setting(
      userMapper.toEntity(json.user),
    );
    setting.id = json.id;
    setting.layouts = json.layouts;
    return setting;
  }

  public toJSON(entity: Setting): SettingInterface {
    return {
      id: entity.id,
      user: userMapper.toJSON(entity.user),
      layouts: entity.layouts,
    };
  }
}