import JSONMapper from '../JSONMapper';
import ErrorType from '../../../error/ErrorType';
import App, { AppInterface } from '../../../domain/entities/account/App';
import { APPLICATION_ERROR_FACTORY } from '../../errors/factories';
import UserJSONMapper from './UserJSONMapper';

const userMapper: UserJSONMapper = new UserJSONMapper();

export default class AppJSONMapper implements JSONMapper<AppInterface, App> {
  public toEntity(json: AppInterface): App {
    if (
      !json.user
    ) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid json');
    }
    const app: App = new App();
    app.id = json.id;
    app.user = json.user && userMapper.toEntity(json.user);
    app.type = json.type;
    app.data = json.data;
    return app;
  }

  public toJSON(entity: App): AppInterface {
    return {
      id: entity.id,
      user: entity.user && userMapper.toJSON(entity.user),
      type: entity.type,
      data: entity.data,
    };
  }
}
