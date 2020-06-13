import {
  Observable,
  of
} from 'rxjs';
import AppRepositoryInterface from '@unimark/core/lib/domain/repositories/account/AppRepository';
import App from '@unimark/core/lib/domain/entities/account/App';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import FirebaseAppProvider from '@unimark/firebase/lib/data/providers/account/FirebaseAppProvider';
// --ADD_IMPORT--

export default class AppRepository implements AppRepositoryInterface {
  constructor(
    private provider: FirebaseAppProvider,
  ) {
  }

  public createApp(app: App): Observable<[App, boolean]> {
    return this.provider.createApp(app);
  }

  public findAppsBy(options: Options): Observable<App[]> {
    return this.provider.findAppsBy(options);
  }

  public updateApp(app: App): Observable<[App, boolean]> {
    return this.provider.updateApp(app);
  }

  public deleteApp(app: App): Observable<[App, boolean]> {
    return this.provider.deleteApp(app);
  }

  public countApps(options: Options): Observable<number> {
    return this.provider.countApps(options);
  }

  // --ADD_METHOD--
}
