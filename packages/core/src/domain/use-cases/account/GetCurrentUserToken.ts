import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import UserRepository from '../../repositories/account/UserRepository';

export default class GetCurrentUserToken extends UseCase<string | null> {
  constructor(
    private repository: UserRepository
  ) {
    super();
  }

  protected build(): Observable<string | null> {
    return this.repository.getCurrentUserToken();
  }

  protected validate(): boolean {
    return true;
  }
}