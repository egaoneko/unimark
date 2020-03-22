import {
  Observable,
} from 'rxjs';
import UserRepositoryInterface from '@unimark/core/lib/domain/repositories/account/UserRepository';
import User from '@unimark/core/lib/domain/entities/account/User';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import FirebaseUserProvider from '@unimark/firebase/lib/data/providers/account/FirebaseUserProvider';
// --ADD_IMPORT--

export default class UserRepository implements UserRepositoryInterface {
  constructor(
    private provider: FirebaseUserProvider,
  ) {
  }

  public getCurrentUser(): Observable<User | null> {
    return this.provider.getCurrentUser();
  }

  public getCurrentUserToken(): Observable<string | null> {
    return this.provider.getCurrentUserToken();
  }

  public createUser(user: User): Observable<[User, boolean]> {
    return this.provider.createUser(user);
  }

  public findUsersBy(options: Options): Observable<User[]> {
    return this.provider.findUsersBy(options);
  }

  public updateUser(user: User): Observable<[User, boolean]> {
    return this.provider.updateUser(user);
  }

  public deleteUser(user: User): Observable<[User, boolean]> {
    return this.provider.deleteUser(user);
  }

  public countUsers(options: Options): Observable<number> {
    return this.provider.countUsers(options);
  }
  // --ADD_METHOD--
}