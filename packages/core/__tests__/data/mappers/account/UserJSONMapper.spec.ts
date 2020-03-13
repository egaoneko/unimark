import User, { UserInterface } from '../../../../src/domain/entities/account/User';
import UserJSONMapper from '../../../../src/data/mappers/account/UserJSONMapper';
import {
  DEFAULT_USER,
  DEFAULT_USER_JSON
} from '../../../../__mocks__/account/constant';

describe('UserJSONMapper', () => {
  const mapper: UserJSONMapper = new UserJSONMapper();
  const json: UserInterface = DEFAULT_USER_JSON;
  const entity: User = DEFAULT_USER;

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
