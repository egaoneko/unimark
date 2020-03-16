import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  catchError,
  switchMap
} from 'rxjs/operators';
import ErrorType from '@unimark/core/lib/error/ErrorType';
import { APPLICATION_ERROR_FACTORY } from '@unimark/core/lib/data/errors/factories';
import FirebaseProvider from '../FirebaseProvider';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { FirebaseSetting } from '../../../interfaces/account/setting';

export default class FirebaseSettingProvider extends FirebaseProvider {

  public createSetting(setting: Setting): Observable<[Setting, boolean]> {
    return fromPromise(
      this.db
        .collection('settings')
        .add({
          userId: setting.user.id,
          layouts: setting.layouts,
        } as FirebaseSetting)
    )
      .pipe(
        switchMap<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>, Observable<[Setting, boolean]>>(
          (doc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>): Observable<[Setting, boolean]> => {
            setting.id = doc.id;
            return of([setting, true]);
          }
        ),
        catchError((err) => {
          throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create settings: ${err}`);
        })
      );
  }

  public findSettingsBy(options: Options): Observable<Setting[]> {
    throw 'Not Implements';
  }

  public updateSetting(setting: Setting): Observable<[Setting, boolean]> {
    return fromPromise(
      this.db
        .collection('settings')
        .doc(setting.id)
        .set({
          userId: setting.user.id,
          layouts: setting.layouts,
        } as FirebaseSetting)
    )
      .pipe(
        switchMap<void, Observable<[Setting, boolean]>>(
          (): Observable<[Setting, boolean]> => {
            return of([setting, true]);
          }
        ),
        catchError((err) => {
          throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, `Fail create settings: ${err}`);
        })
      );
  }

  public deleteSetting(setting: Setting): Observable<[Setting, boolean]> {
    throw 'Not Implements';
  }

  public countSettings(options: Options): Observable<number> {
    throw 'Not Implements';
  }
}