import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import App from '@unimark/core/lib/domain/entities/account/App';
import FirebaseProvider from '../FirebaseProvider';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { FirestoreApp } from '../../../interfaces/account/app';
import FirebaseUserProvider from './FirebaseUserProvider';
import User from '@unimark/core/lib/domain/entities/account/User';
import { switchMap } from 'rxjs/operators';

export default class FirebaseAppProvider extends FirebaseProvider<FirestoreApp, App> {

  constructor(
    db: firebase.firestore.Firestore,
    auth: firebase.auth.Auth,
    private user: FirebaseUserProvider,
  ) {
    super(db, auth, 'apps');
  }

  public createApp(app: App): Observable<[App, boolean]> {
    return this.create(app);
  }

  public findAppsBy(options: Options): Observable<App[]> {
    return this.findBy(options);
  }

  public updateApp(app: App): Observable<[App, boolean]> {
    return this.update(app);
  }

  public deleteApp(app: App): Observable<[App, boolean]> {
    return this.delete(app);
  }

  public countApps(options: Options): Observable<number> {
    return this.count(options);
  }

  protected project(entity: App): Observable<FirestoreApp> {
    return of({
      userId: entity.user.id,
      type: entity.type,
      data: entity.data,
    });
  }

  protected unproject(data: FirestoreApp): Observable<App> {
    const app: App = new App();
    app.id = data.id as string;
    app.type = data.type;
    app.data = data.data;

    return this.user.findUsersBy({
      id: data.userId,
    }).pipe(
      switchMap<User[], Observable<App>>((users: User[]): Observable<App> => {
        if (users.length === 1) {
          app.user = users[0];
        }
        return of(app);
      })
    );
  }
}
