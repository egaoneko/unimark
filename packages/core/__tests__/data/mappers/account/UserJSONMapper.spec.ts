import User, { UserInterface } from '../../../../src/domain/entities/account/User';
import UserJSONMapper from '../../../../src/data/mappers/account/UserJSONMapper';
import { Role } from '../../../../src/enums/account';

describe('UserJSONMapper', () => {
  const mapper: UserJSONMapper = new UserJSONMapper();
  const json: UserInterface = {
    id: '0',
    email: 'test@test.com',
    name: 'Test',
    role: Role.USER,
    photo: 'photo',
  };
  const entity: User = new User(
    '0',
    'test@test.com',
    'Test',
    Role.USER,
  );
  entity.photo = 'photo';

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
