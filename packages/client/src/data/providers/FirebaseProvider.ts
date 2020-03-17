import firebase from 'firebase';
import {
  Observable,
  of
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

export default abstract class FirebaseProvider<S extends Serializable, T extends Serializable> {

  protected static GET_OPTIONS: firebase.firestore.GetOptions = {};

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

  public create(entity: T): Observable<[T, boolean]> {
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

  public findBy(options: Options): Observable<T[]> {
    throw 'Not Implements';
  }

  public update(entity: T): Observable<[T, boolean]> {
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

  public delete(data: S): Observable<[T, boolean]> {
    throw 'Not Implements';
  }

  public count(options: Options): Observable<number> {
    throw 'Not Implements';
  }

  protected abstract project(entity: T): S;

  protected abstract unproject(data: S): T;
}
