import App, { AppInterface } from '../../../../src/domain/entities/account/App';
import AppJSONMapper from '../../../../src/data/mappers/account/AppJSONMapper';
import {
  DEFAULT_APP,
  DEFAULT_APP_JSON
} from '../../../../__mocks__/account/constant';

describe('AppJSONMapper', () => {
  const mapper: AppJSONMapper = new AppJSONMapper();
  const json: AppInterface = DEFAULT_APP_JSON;
  const entity: App = DEFAULT_APP;

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
