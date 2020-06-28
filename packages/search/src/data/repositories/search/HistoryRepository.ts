import {
  Observable,
  of
} from 'rxjs';
import HistoryRepositoryInterface from '@unimark/core/lib/domain/repositories/search/HistoryRepository';
import History from '@unimark/core/lib/domain/entities/search/History';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import FirebaseHistoryProvider from '@unimark/firebase/lib/data/providers/search/FirebaseHistoryProvider';
// --ADD_IMPORT--

export default class HistoryRepository implements HistoryRepositoryInterface {

  constructor(
    private provider: FirebaseHistoryProvider,
  ) {
  }

  public createHistory(app: History): Observable<[History, boolean]> {
    return this.provider.createHistory(app);
  }

  public findHistoriesBy(options: Options): Observable<History[]> {
    return this.provider.findHistoriesBy(options);
  }

  public updateHistory(app: History): Observable<[History, boolean]> {
    return this.provider.updateHistory(app);
  }

  public deleteHistory(app: History): Observable<[History, boolean]> {
    return this.provider.deleteHistory(app);
  }

  public countHistories(options: Options): Observable<number> {
    return this.provider.countHistories(options);
  }

  // --ADD_METHOD--
}
