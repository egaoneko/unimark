import {
  Observable,
  of
} from 'rxjs';
import Repository from '../Repository';
import App from '../../entities/account/App';
import { Options } from '../../../interfaces/repository/options';
// --ADD_IMPORT--

export default interface AppRepository extends Repository {
  createApp(app: App): Observable<[App, boolean]>;

  findAppsBy(options: Options): Observable<App[]>;

  updateApp(app: App): Observable<[App, boolean]>;

  deleteApp(app: App): Observable<[App, boolean]>;

  countApps(options: Options): Observable<number>;

  // --ADD_METHOD--
}