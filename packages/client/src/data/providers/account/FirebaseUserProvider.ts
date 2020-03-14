import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import User, { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import FirebaseUserMapper from '../../mappers/account/FirebaseUserMapper';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  switchMap
} from 'rxjs/operators';
import UserJSONMapper from '@unimark/core/lib/data/mappers/account/UserJSONMapper';
import ErrorType from '@unimark/core/lib/error/ErrorType';
import { APPLICATION_ERROR_FACTORY } from '@unimark/core/lib/data/errors/factories';
import FirebaseProvider from '../FirebaseProvider';

const mapper: UserJSONMapper = new UserJSONMapper();

export default class FirebaseUserProvider extends FirebaseProvider {
  public findUserById(id: string): Observable<User | null> {
    const userRef: firebase.database.Reference = this.db.ref('users/' + id);
    return fromPromise(userRef.once('value'))
      .pipe(
        switchMap<firebase.database.DataSnapshot, Observable<User | null>>(
          (dataSnapShot: firebase.database.DataSnapshot): Observable<User | null> => {
            if (!dataSnapShot.hasChildren()) {
              return of(null);
            }
            return of(mapper.toEntity({
              id,
              ...dataSnapShot.toJSON() as UserInterface,
            }));
          }
        )
      );
  }

  public createUser(user: User): Observable<[User, boolean]> {
    const userRef: firebase.database.Reference = this.db.ref('users/' + user.id);
    return fromPromise(userRef.once('value'))
      .pipe(
        switchMap<firebase.database.DataSnapshot, Observable<[User, boolean]>>(
          (dataSnapShot: firebase.database.DataSnapshot): Observable<[User, boolean]> => {
            if (!dataSnapShot.hasChildren()) {
              return fromPromise(
                userRef
                  .set(mapper.toJSON(user))
                  .then((err: any): [User, boolean] => {
                    if (err) {
                      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create user: ${err}`);
                    }
                    return [user, true];
                  })
              );
            }
            return fromPromise(Promise.resolve([user, false]));
          }
        )
      );
  }

  public getCurrentUser(): Observable<User | null> {
    const user: firebase.User | null = this.auth.currentUser;

    if (!user) {
      return of(null);
    }

    return of(new FirebaseUserMapper().toEntity(user));
  }

  public getCurrentUserToken(): Observable<string | null> {
    const user: firebase.User | null = this.auth.currentUser;

    if (!user) {
      return of(null);
    }

    return fromPromise(user.getIdToken());
  }
}