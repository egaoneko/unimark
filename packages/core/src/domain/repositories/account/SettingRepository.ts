import {
  Observable,
  of
} from 'rxjs';
import Repository from '../Repository';
import Setting from '../../entities/account/Setting';
import { Options } from '../../../interfaces/repository/options';
// --ADD_IMPORT--

export default interface SettingRepository extends Repository {
  createSetting(setting: Setting): Observable<[Setting, boolean]>;

  findSettingsBy(options: Options): Observable<Setting[]>;

  updateSetting(setting: Setting): Observable<[Setting, boolean]>;

  deleteSetting(setting: Setting): Observable<[Setting, boolean]>;

  countSettings(options: Options): Observable<number>;

  // --ADD_METHOD--
}