import {
  Observable,
  of
} from 'rxjs';
import SettingRepositoryInterface from '@unimark/core/lib/domain/repositories/account/SettingRepository';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import FirebaseSettingProvider from '@unimark/firebase/lib/data/providers/account/FirebaseSettingProvider';
// --ADD_IMPORT--

export default class SettingRepository implements SettingRepositoryInterface {
  constructor(
    private provider: FirebaseSettingProvider,
  ) {
  }

  public createSetting(setting: Setting): Observable<[Setting, boolean]> {
    return this.provider.createSetting(setting);
  }

  public findSettingsBy(options: Options): Observable<Setting[]> {
    return this.provider.findSettingsBy(options);
  }

  public updateSetting(setting: Setting): Observable<[Setting, boolean]> {
    return this.provider.updateSetting(setting);
  }

  public deleteSetting(setting: Setting): Observable<[Setting, boolean]> {
    return this.provider.deleteSetting(setting);
  }

  public countSettings(options: Options): Observable<number> {
    return this.provider.countSettings(options);
  }

  // --ADD_METHOD--
}