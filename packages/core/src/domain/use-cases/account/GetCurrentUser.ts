import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import User from '../../entities/account/User';
import UserRepository from '../../repositories/account/UserRepository';

export default class GetCurrentUser extends UseCase<User | null> {
  constructor(
    private repository: UserRepository
  ) {
    super();
  }

  protected build(): Observable<User | null> {
    return this.repository.getCurrentUser();
  }

  protected validate(): boolean {
    return true;
  }
}