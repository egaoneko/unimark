import firebase from 'firebase';
import {
  forkJoin,
  Observable,
  of,
} from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  catchError,
  flatMap,
  switchMap
} from 'rxjs/operators';
import { APPLICATION_ERROR_FACTORY } from '@unimark/core/lib/data/errors/factories';
import ErrorType from '@unimark/core/lib/error/ErrorType';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';

export default abstract class FirebaseProvider<S extends Serializable, T extends Serializable> {

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
    const id: string | number | undefined = entity.id;

    if (id) {
      return this.project(entity)
        .pipe(
          flatMap<S, Observable<void>>((data: S): Observable<void> => {
            return fromPromise(
              this.collection
                .doc(id.toString())
                .set(data)
            )
          }),
          switchMap<void, Observable<[T, boolean]>>(
            (): Observable<[T, boolean]> => {
              return of([entity, true]);
            }
          ),
          catchError((err) => {
            throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create settings: ${err}`);
          })
        );
    } else {
      return this.project(entity)
        .pipe(
          flatMap<S, Observable<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>>(
            (data: S): Observable<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> => {
              return fromPromise(
                this.collection
                  .add(data)
              )
            }
          ),
          switchMap<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>, Observable<[T, boolean]>>(
            (doc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>): Observable<[T, boolean]> => {
              entity.id = doc.id;
              return of([entity, true]);
            }
          ),
          catchError((err) => {
            throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create settings: ${err}`);
          })
        );
    }
  }

  protected findBy(options: Options): Observable<T[]> {
    if (options.id) {
      return fromPromise(
        this.collection
          .doc(options.id.toString())
          .get()
      )
        .pipe(
          switchMap<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>, Observable<T[]>>(
            (doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Observable<T[]> => {
              if (!doc.exists) {
                return of([]);
              }

              const data: S = doc.data() as S;
              data.id = doc.id;
              return this.unproject(data)
                .pipe(
                  flatMap<T, Observable<T[]>>((entity: T): Observable<T[]> => of([entity]))
                );
            }
          ),
          catchError((err) => {
            throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail findBy ${this.collectionPath}: ${err}`);
          })
        );
    }

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
          if (querySnapshot.empty) {
            return of([]);
          }

          const list: Observable<T>[] = [];
          querySnapshot.forEach(doc => {
            list.push(this.unproject({
              ...doc.data(),
              id: doc.id,
            } as S))
          });
          return forkJoin<Observable<T>[]>(list);
        }
      ),
      catchError((err) => {
        throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail find settings: ${err}`);
      })
    );
  }

  protected update(entity: T): Observable<[T, boolean]> {
    const id: string | number | undefined = entity.id;
    if (!id) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Invalid entity: empty id`);
    }

    return this.project(entity)
      .pipe(
        flatMap<S, Observable<void>>((data: S): Observable<void> => {
          return fromPromise(
            this.collection
              .doc(id.toString())
              .update(data)
          )
        }),
        switchMap<void, Observable<[T, boolean]>>(
          (): Observable<[T, boolean]> => {
            return of([entity, true]);
          }
        ),
        catchError((err) => {
          throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail update settings: ${err}`);
        })
      );
  }

  protected delete(entity: T): Observable<[T, boolean]> {
    const id: string | number | undefined = entity.id;
    if (!id) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Invalid entity: empty id`);
    }

    return fromPromise(
      this.collection
        .doc(id.toString())
        .delete()
    )
      .pipe(
        switchMap<void, Observable<[T, boolean]>>(
          (): Observable<[T, boolean]> => {
            return of([entity, true]);
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

  protected abstract project(entity: T): Observable<S>;

  protected abstract unproject(data: S): Observable<T>;
}
