import JSONMapper from '../JSONMapper';
import ErrorType from '../../../error/ErrorType';
import User, { UserInterface } from '../../../domain/entities/account/User';
import { APPLICATION_ERROR_FACTORY } from '../../errors/factories';

export default class UserJSONMapper implements JSONMapper<UserInterface, User> {
  public toEntity(json: UserInterface): User {
    if (
      !json.id ||
      !json.email ||
      !json.name ||
      !json.role
    ) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid json');
    }
    const user: User = new User();
    user.id = json.id;
    user.email = json.email;
    user.name = json.name;
    user.role = json.role;
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