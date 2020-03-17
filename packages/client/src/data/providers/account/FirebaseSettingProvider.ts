import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import FirebaseProvider from '../FirebaseProvider';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { FirestoreSetting } from '../../../interfaces/account/setting';

export default class FirebaseSettingProvider extends FirebaseProvider<FirestoreSetting, Setting> {

  constructor(
    db: firebase.firestore.Firestore,
    auth: firebase.auth.Auth,
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
    return this.create(setting);
  }

  public countSettings(options: Options): Observable<number> {
    return this.count(options);
  }

  protected project(entity: Setting): FirestoreSetting {
    return {
      id: entity.id,
      userId: entity.user.id,
      layouts: entity.layouts,
    };
  }

  protected unproject(data: FirestoreSetting): Setting {
    const setting: Setting = new Setting();
    setting.id = data.id as string;
    // TODO Add user
    setting.layouts = data.layouts;
    return setting;
  }
}