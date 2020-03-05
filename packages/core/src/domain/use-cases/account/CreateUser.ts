import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import User from '../../entities/account/User';
import UserRepository from '../../repositories/account/UserRepository';
import { Role } from '../../../enums/account';

export default class CreateUser extends UseCase<[User, boolean]> {
  public user: User | null = null;

  constructor(
    private repository: UserRepository
  ) {
    super();
  }

  protected build(): Observable<[User, boolean]> {
    return this.repository.createUser(this.user as User);
  }

  protected validate(): boolean {
    if (!this.user) {
      return false;
    }

    if (!this.user.id) {
      return false;
    }

    if (!this.user.email) {
      return false;
    }

    if (!this.user.name) {
      return false;
    }

    if (!this.user.role) {
      return false;
    }

    if (!(this.user.role in Role)) {
      return false;
    }

    return true;
  }
}