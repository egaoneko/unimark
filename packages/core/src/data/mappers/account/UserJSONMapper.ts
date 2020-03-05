import JSONMapper from '../JSONMapper';
import ApplicationErrorFactory from '../../errors/ApplicationErrorFactory';
import ErrorType from '../../../error/ErrorType';
import User, { UserInterface } from '../../../domain/entities/account/User';

export default class UserJSONMapper implements JSONMapper<UserInterface, User> {
  public toEntity(json: UserInterface): User {
    if (
      !json.id ||
      !json.email ||
      !json.name ||
      !json.role
    ) {
      throw ApplicationErrorFactory.getError(ErrorType.GENERAL, 'Invalid json');
    }
    const user: User = new User(
      json.id,
      json.email,
      json.name,
      json.role,
    );
    user.photo = json.photo;
    return user;
  }

  public toJSON(entity: User): UserInterface {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      role: entity.role,
      photo: entity.photo,
    };
  }
}