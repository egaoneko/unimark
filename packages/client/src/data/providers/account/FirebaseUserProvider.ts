import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import User, { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import FirebaseUserMapper from '../../mappers/account/FirebaseUserMapper';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  catchError,
  switchMap
} from 'rxjs/operators';
import UserJSONMapper from '@unimark/core/lib/data/mappers/account/UserJSONMapper';
import ErrorType from '@unimark/core/lib/error/ErrorType';
import { APPLICATION_ERROR_FACTORY } from '@unimark/core/lib/data/errors/factories';
import FirebaseProvider from '../FirebaseProvider';

const mapper: UserJSONMapper = new UserJSONMapper();

export default class FirebaseUserProvider extends FirebaseProvider {

  public findUserById(id: string): Observable<User | null> {
    return fromPromise(
      this.db
        .collection('users')
        .doc(id)
        .get(FirebaseProvider.GET_OPTIONS)
    )
      .pipe(
        switchMap<firebase.firestore.DocumentSnapshot, Observable<User | null>>(
          (doc: firebase.firestore.DocumentSnapshot): Observable<User | null> => {
            if (!doc.exists) {
              return of(null);
            }
            return of(mapper.toEntity(doc.data() as UserInterface));
          }
        )
      );
  }

  public createUser(user: User): Observable<[User, boolean]> {
    return this.findUserById(user.id)
      .pipe(
        switchMap<User | null, Observable<[User, boolean]>>(
          (dbUser: User | null): Observable<[User, boolean]> => {
            if (dbUser) {
              return of([dbUser, false]);
            }

            return fromPromise(
              this.db
                .collection('users')
                .doc(user.id)
                .set(mapper.toJSON(user)))
              .pipe(
                switchMap<void, Observable<[User, boolean]>>(
                  (): Observable<[User, boolean]> => of([user, true])
                ),
                catchError((err) => {
                  throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create user: ${err}`);
                })
              );
          }
        ),
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