import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import UserRepository from '../../repositories/account/UserRepository';
import { Options } from '../../../interfaces/repository/options';

export default class CountUsers extends UseCase<number> {
  public options: Options = {};

  constructor(
    private repository: UserRepository
  ) {
    super();
  }

  protected build(): Observable<number> {
    return this.repository.countUsers(this.options);
  }
}
