import {
  Observable,
} from 'rxjs';
import UserRepositoryInterface from '@unimark/core/lib/domain/repositories/account/UserRepository';
import User from '@unimark/core/lib/domain/entities/account/User';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import FirebaseUserProvider from '@unimark/firebase/lib/data/providers/account/FirebaseUserProvider';

export default class UserRepository implements UserRepositoryInterface {
  constructor(
    private firebaseProvider: FirebaseUserProvider,
  ) {
  }

  public getCurrentUser(): Observable<User | null> {
    return this.firebaseProvider.getCurrentUser();
  }

  public getCurrentUserToken(): Observable<string | null> {
    return this.firebaseProvider.getCurrentUserToken();
  }

  public createUser(user: User): Observable<[User, boolean]> {
    return this.firebaseProvider.createUser(user);
  }

  public findUsersBy(options: Options): Observable<User[]> {
    return this.firebaseProvider.findUsersBy(options);
  }

  public updateUser(user: User): Observable<[User, boolean]> {
    return this.firebaseProvider.updateUser(user);
  }

  public deleteUser(user: User): Observable<[User, boolean]> {
    return this.firebaseProvider.deleteUser(user);
  }

  public countUsers(options: Options): Observable<number> {
    return this.firebaseProvider.countUsers(options);
  }
}