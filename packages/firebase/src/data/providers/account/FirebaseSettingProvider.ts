import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import FirebaseProvider from '../FirebaseProvider';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { FirestoreSetting } from '../../../interfaces/account/setting';
import FirebaseUserProvider from './FirebaseUserProvider';
import User from '@unimark/core/lib/domain/entities/account/User';
import { switchMap } from 'rxjs/operators';

export default class FirebaseSettingProvider extends FirebaseProvider<FirestoreSetting, Setting> {

  constructor(
    db: firebase.firestore.Firestore,
    auth: firebase.auth.Auth,
    private user: FirebaseUserProvider,
  ) {
    super(db, auth, 'settings');
  }

  public createSetting(setting: Setting): Observable<[Setting, boolean]> {
    return this.create(setting);
  }

  public findSettingsBy(options: Options): Observable<Setting[]> {
    return this.findBy(options);
  }

  public updateSetting(setting: Setting): Observable<[Setting, boolean]> {
    return this.update(setting);
  }

  public deleteSetting(setting: Setting): Observable<[Setting, boolean]> {
    return this.delete(setting);
  }

  public countSettings(options: Options): Observable<number> {
    return this.count(options);
  }

  protected project(entity: Setting): Observable<FirestoreSetting> {
    return of({
      userId: entity.user.id,
      layouts: entity.layouts,
    });
  }

  protected unproject(data: FirestoreSetting): Observable<Setting> {
    const setting: Setting = new Setting();
    setting.id = data.id as string;
    setting.layouts = data.layouts;

    return this.user.findUsersBy({
      id: data.userId,
    }).pipe(
      switchMap<User[], Observable<Setting>>((users: User[]): Observable<Setting> => {
        if (users.length === 1) {
          setting.user = users[0];
        }
        return of(setting);
      })
    );
  }
}