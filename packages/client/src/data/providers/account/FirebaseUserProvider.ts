import {
  AsyncSubject,
  Observable,
  of
} from 'rxjs';
import User, { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import firebase from '../../../externals/firebase';
import FirebaseUserMapper from '../../mappers/account/FirebaseUserMapper';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  switchMap
} from 'rxjs/operators';
import UserJSONMapper from '@unimark/core/lib/data/mappers/account/UserJSONMapper';
import { ApplicationErrorFactory } from '@unimark/core/lib/data/errors/ApplicationErrorFactory';
import ErrorType from '@unimark/core/lib/error/ErrorType';

const mapper: UserJSONMapper = new UserJSONMapper();

export default class FirebaseUserProvider {
  public findUserById(id: string): Observable<User | null> {
    const userRef: firebase.database.Reference = firebase.database().ref('users/' + id);
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
    const userRef: firebase.database.Reference = firebase.database().ref('users/' + user.id);
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
                    provider: user.provider,
                  })
                  .then((err: any): [User, boolean] => {
                    if (err) {
                      throw ApplicationErrorFactory.getError(ErrorType.GENERAL, `Fail create user: ${err}`);
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
    const subject: AsyncSubject<User | null> = new AsyncSubject();
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (!user) {
        subject.next(null);
      } else {
        subject.next(new FirebaseUserMapper().toEntity(user));
      }
      subject.complete();
    });
    return subject;
  }

  public getCurrentUserToken(): Observable<string | null> {
    const user: firebase.User | null = firebase.auth().currentUser;

    if (!user) {
      return of(null);
    }

    return fromPromise(user.getIdToken());
  }
}