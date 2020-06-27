import {
  Observable,
  of
} from 'rxjs';
import firebase from 'firebase';
import History from '@unimark/core/lib/domain/entities/search/History';
import FirebaseProvider from '../FirebaseProvider';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { FirestoreHistory } from '../../../interfaces/search/history';
import FirebaseUserProvider from '../account/FirebaseUserProvider';
import User from '@unimark/core/lib/domain/entities/account/User';
import { switchMap } from 'rxjs/operators';

export default class FirebaseHistoryProvider extends FirebaseProvider<FirestoreHistory, History> {

  constructor(
    db: firebase.firestore.Firestore,
    auth: firebase.auth.Auth,
    private user: FirebaseUserProvider,
  ) {
    super(db, auth, 'histories');
  }

  public createHistory(history: History): Observable<[History, boolean]> {
    return this.create(history);
  }

  public findHistoriesBy(options: Options): Observable<History[]> {
    return this.findBy(options);
  }

  public updateHistory(history: History): Observable<[History, boolean]> {
    return this.update(history);
  }

  public deleteHistory(history: History): Observable<[History, boolean]> {
    return this.delete(history);
  }

  public countHistories(options: Options): Observable<number> {
    return this.count(options);
  }

  protected project(entity: History): Observable<FirestoreHistory> {
    return of({
      userId: entity.user.id,
      word: entity.word,
      engine: entity.engine,
      link: entity.link,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  protected unproject(data: FirestoreHistory): Observable<History> {
    const history: History = new History();
    history.id = data.id as string;
    history.word = data.word;
    history.engine = data.engine;
    history.link = data.link;
    history.createdAt = data.createdAt;
    history.updatedAt = data.updatedAt;

    return this.user.findUsersBy({
      id: data.userId,
    }).pipe(
      switchMap<User[], Observable<History>>((users: User[]): Observable<History> => {
        if (users.length === 1) {
          history.user = users[0];
        }
        return of(history);
      })
    );
  }
}
