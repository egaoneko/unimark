import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import User from '@unimark/core/lib/domain/entities/account/User';
import FirebaseUserMapper from '../../mappers/account/FirebaseUserMapper';
import { fromPromise } from 'rxjs/internal-compatibility';
import FirebaseProvider from '../FirebaseProvider';
import { FirestoreUser } from '../../../interfaces/account/user';
import { Options } from '@unimark/core/lib/interfaces/repository/options';

export default class FirebaseUserProvider extends FirebaseProvider<FirestoreUser, User> {

  constructor(
    db: firebase.firestore.Firestore,
    auth: firebase.auth.Auth,
  ) {
    super(db, auth, 'users');
  }

  public getCurrentUser(): Observable<User | null> {
    const user: firebase.User | null = this.currentUser;

    if (!user) {
      return of(null);
    }

    return of(new FirebaseUserMapper().toEntity(user));
  }

  public getCurrentUserToken(): Observable<string | null> {
    const user: firebase.User | null = this.currentUser;

    if (!user) {
      return of(null);
    }

    return fromPromise(user.getIdToken());
  }

  public createUser(user: User): Observable<[User, boolean]> {
    return this.create(user);
  }

  public findUsersBy(options: Options): Observable<User[]> {
    return this.findBy(options);
  }

  public updateUser(user: User): Observable<[User, boolean]> {
    return this.update(user);
  }

  public deleteUser(user: User): Observable<[User, boolean]> {
    return this.create(user);
  }

  public countUsers(options: Options): Observable<number> {
    return this.count(options);
  }

  protected project(entity: User): FirestoreUser {
    return {
      email: entity.email,
      name: entity.name,
      role: entity.role,
      photo: entity.photo,
    };
  }

  protected unproject(data: FirestoreUser): User {
    const user: User = new User();
    user.id = data.id as string;
    user.email = data.email;
    user.name = data.name;
    user.role = data.role;
    user.photo = data.photo;
    return user;
  }
}