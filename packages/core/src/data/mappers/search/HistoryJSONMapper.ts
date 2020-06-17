import JSONMapper from '../JSONMapper';
import ErrorType from '../../../error/ErrorType';
import History, { HistoryInterface } from '../../../domain/entities/search/History';
import { APPLICATION_ERROR_FACTORY } from '../../errors/factories';
import UserJSONMapper from '../account/UserJSONMapper';

const userMapper: UserJSONMapper = new UserJSONMapper();

export default class HistoryJSONMapper implements JSONMapper<HistoryInterface, History> {
  public toEntity(json: HistoryInterface): History {
    if (
      !json.user
    ) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid json');
    }
    const setting: History = new History();
    setting.id = json.id;
    setting.user = json.user && userMapper.toEntity(json.user);
    setting.word = json.word;
    setting.engine = json.engine;
    setting.link = json.link;
    setting.createdAt = json.createdAt;
    setting.updatedAt = json.updatedAt;
    return setting;
  }

  public toJSON(entity: History): HistoryInterface {
    return {
      id: entity.id,
      user: entity.user && userMapper.toJSON(entity.user),
      word: entity.word,
      engine: entity.engine,
      link: entity.link,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
