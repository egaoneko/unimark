import {
  Observable,
  of
} from 'rxjs';
import Repository from '../Repository';
import History from '../../entities/search/History';
import { Options } from '../../../interfaces/repository/options';
// --ADD_IMPORT--

export default interface HistoryRepository extends Repository {
  createHistory(history: History): Observable<[History, boolean]>;

  findHistoriesBy(options: Options): Observable<History[]>;

  updateHistory(history: History): Observable<[History, boolean]>;

  deleteHistory(history: History): Observable<[History, boolean]>;

  countHistories(options: Options): Observable<number>;

  // --ADD_METHOD--
}