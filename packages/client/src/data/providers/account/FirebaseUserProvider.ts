import {
  Observable,
  of
} from 'rxjs';
import User, { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import firebase, {
  auth,
  db
} from '../../../externals/firebase';
import FirebaseUserMapper from '../../mappers/account/FirebaseUserMapper';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  switchMap
} from 'rxjs/operators';
import UserJSONMapper from '@unimark/core/lib/data/mappers/account/UserJSONMapper';
import ErrorType from '@unimark/core/lib/error/ErrorType';
import { APPLICATION_ERROR_FACTORY } from '@unimark/core/lib/data/errors/factories';

const mapper: UserJSONMapper = new UserJSONMapper();

export default class FirebaseUserProvider {
  public findUserById(id: string): Observable<User | null> {
    const userRef: firebase.database.Reference = db.ref('users/' + id);
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
    const userRef: firebase.database.Reference = db.ref('users/' + user.id);
    return fromPromise(userRef.once('value'))
      .pipe(
        switchMap<firebase.database.DataSnapshot, Observable<[User, boolean]>>(
          (dataSnapShot: firebase.database.DataSnapshot): Observable<[User, boolean]> => {
            if (!dataSnapShot.hasChildren()) {
              return fromPromise(
                userRef
                  .set({
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    photo: user.photo,
                  })
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
    const user: firebase.User | null = auth.currentUser;

    if (!user) {
      return of(null);
    }

    return of(new FirebaseUserMapper().toEntity(user));
  }

  public getCurrentUserToken(): Observable<string | null> {
    const user: firebase.User | null = auth.currentUser;

    if (!user) {
      return of(null);
    }

    return fromPromise(user.getIdToken());
  }
}