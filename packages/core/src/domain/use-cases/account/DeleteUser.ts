import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import User from '../../entities/account/User';
import UserRepository from '../../repositories/account/UserRepository';

export default class DeleteUser extends UseCase<[User, boolean]> {
  public user: User | null = null;

  constructor(
    private repository: UserRepository
  ) {
    super();
  }

  protected build(): Observable<[User, boolean]> {
    return this.repository.deleteUser(this.user as User);
  }

  protected validate(): boolean {
    if (!this.user) {
      return false;
    }

    if (!this.user.id) {
      return false;
    }

    return true;
  }
}
