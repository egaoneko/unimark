import firebase from 'firebase';
import {
  Observable,
  of,
} from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  catchError,
  switchMap
} from 'rxjs/operators';
import { APPLICATION_ERROR_FACTORY } from '@unimark/core/lib/data/errors/factories';
import ErrorType from '@unimark/core/lib/error/ErrorType';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';
import Entity from '@unimark/core/lib/domain/entities/Entity';

export default abstract class FirebaseProvider<S extends Serializable, T extends Entity> {

  protected get collection(): firebase.firestore.CollectionReference {
    return this.db.collection(this.collectionPath);
  }

  protected get currentUser(): firebase.User | null {
    return this.auth.currentUser;
  }

  constructor(
    private db: firebase.firestore.Firestore,
    private auth: firebase.auth.Auth,
    private collectionPath: string,
  ) {
  }

  protected create(entity: T): Observable<[T, boolean]> {
    const data: S = this.project(entity);

    if (entity.id) {
      return fromPromise(
        this.collection
          .doc(entity.id.toString())
          .set(data)
      )
        .pipe(
          switchMap<void, Observable<[T, boolean]>>(
            (): Observable<[T, boolean]> => {
              return of([this.unproject(data), true]);
            }
          ),
          catchError((err) => {
            throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create ${this.collectionPath}: ${err}`);
          })
        );
    } else {
      return fromPromise(
        this.collection
          .add(data)
      )
        .pipe(
          switchMap<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>, Observable<[T, boolean]>>(
            (doc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>): Observable<[T, boolean]> => {
              data.id = doc.id;
              return of([this.unproject(data), true]);
            }
          ),
          catchError((err) => {
            throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create ${this.collectionPath}: ${err}`);
          })
        );
    }
  }

  protected findBy(options: Options): Observable<T[]> {
    const query: firebase.firestore.CollectionReference = this.collection;

    if (options.where) {
      options.where.forEach(w => {
        query.where(w[0], w[1], w[2]);
      });
    }

    if (options.sort) {
      options.sort.forEach(s => {
        query.orderBy(s[0], s[1]);
      });
    }

    if (options.last) {
      query.startAfter(options.last);
    } else if (options.first) {
      query.endBefore(options.first);
    }

    if (options.limit) {
      if (options.first) {
        query.limitToLast(options.limit);
      } else {
        query.limit(options.limit);
      }
    }

    return fromPromise(
      query
        .get()
    ).pipe(
      switchMap<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>, Observable<T[]>>(
        (querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>): Observable<T[]> => {
          const list: T[] = [];
          querySnapshot.forEach(doc => {
            list.push(this.unproject({
              ...doc.data(),
              id: doc.id,
            } as S))
          });
          return of(list);
        }
      ),
      catchError((err) => {
        throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail find settings: ${err}`);
      })
    );
  }

  protected update(entity: T): Observable<[T, boolean]> {
    const data: S = this.project(entity);
    if (!data.id) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Invalid data: empty id`);
    }

    return fromPromise(
      this.collection
        .doc(data.id.toString())
        .set(data)
    )
      .pipe(
        switchMap<void, Observable<[T, boolean]>>(
          (): Observable<[T, boolean]> => {
            return of([this.unproject(data), true]);
          }
        ),
        catchError((err) => {
          throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail update settings: ${err}`);
        })
      );
  }

  protected delete(entity: T): Observable<[T, boolean]> {
    const data: S = this.project(entity);
    if (!data.id) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Invalid data: empty id`);
    }

    return fromPromise(
      this.collection
        .doc(data.id.toString())
        .delete()
    )
      .pipe(
        switchMap<void, Observable<[T, boolean]>>(
          (): Observable<[T, boolean]> => {
            return of([this.unproject(data), true]);
          }
        ),
        catchError((err) => {
          throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail delete settings: ${err}`);
        })
      );
  }

  protected count(options: Options): Observable<number> {
    return this.findBy(options)
      .pipe(
        switchMap<T[], Observable<number>>(
          (list: T[]): Observable<number> => of(list.length)
        )
      );
  }

  protected abstract project(entity: T): S;

  protected abstract unproject(data: S): T;
}
