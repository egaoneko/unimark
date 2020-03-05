import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import User from '../../entities/account/User';
import UserRepository from '../../repositories/account/UserRepository';

export default class FindUserById extends UseCase<User | null> {
  public id: string = '';

  constructor(
    private repository: UserRepository
  ) {
    super();
  }

  protected build(): Observable<User | null> {
    return this.repository.findUserById(this.id);
  }

  protected validate(): boolean {
    return !!this.id;
  }
}