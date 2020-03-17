import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import User from '../../entities/account/User';
import UserRepository from '../../repositories/account/UserRepository';
import { Options } from '../../../interfaces/repository/options';

export default class FindUsersBy extends UseCase<User[]> {
  public options: Options = {};

  constructor(
    private repository: UserRepository
  ) {
    super();
  }

  protected build(): Observable<User[]> {
    return this.repository.findUsersBy(this.options);
  }
}
