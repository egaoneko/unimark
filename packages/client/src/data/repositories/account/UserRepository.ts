import {
  Observable,
} from 'rxjs';
import UserRepositoryInterface from '@unimark/core/lib/domain/repositories/account/UserRepository';
import User from '@unimark/core/lib/domain/entities/account/User';
import FirebaseUserProvider from '../../providers/account/FirebaseUserProvider';

export default class UserRepository implements UserRepositoryInterface {
  constructor(
    private firebaseProvider: FirebaseUserProvider,
  ) {
  }

  public findUserById(id: string): Observable<User | null> {
    return this.firebaseProvider.findUserById(id);
  }

  public createUser(user: User): Observable<[User, boolean]> {
    return this.firebaseProvider.createUser(user);
  }

  public getCurrentUser(): Observable<User | null> {
    return this.firebaseProvider.getCurrentUser();
  }

  public getCurrentUserToken(): Observable<string | null> {
    return this.firebaseProvider.getCurrentUserToken();
  }
}