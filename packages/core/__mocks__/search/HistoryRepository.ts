import {
  Observable,
  of
} from 'rxjs';
import History from '../../src/domain/entities/search/History';
import { Options } from '../../src/interfaces/repository/options';
import { DEFAULT_HISTORY } from './constant';
// --ADD_IMPORT--

const cache: Map<string, History> = new Map();
reset();

export function reset(empty: boolean = false): void {
  cache.clear();

  if (empty) {
    return;
  }
  const history: History = DEFAULT_HISTORY;
  cache.set(history.id as string, history);
}
// --ADD_UTIL--

export const mockCreateHistory = jest.fn().mockImplementation((history: History): Observable<[History, boolean]> => {
  if (cache.has(history.id as string)) {
    return of([cache.get(history.id as string) as History, false]);
  } else {
    cache.set(history.id as string, history);
    return of([history, true]);
  }
});
export const mockFindHistoriesBy = jest.fn().mockImplementation((options: Options): Observable<History[]> => {
  return of(Array.from(cache.values()));
});
export const mockUpdateHistory = jest.fn().mockImplementation((history: History): Observable<[History, boolean]> => {
  if (cache.has(history.id as string)) {
    cache.set(history.id as string, history);
    return of([cache.get(history.id as string) as History, true]);
  } else {
    return of([history, false]);
  }
});
export const mockDeleteHistory = jest.fn().mockImplementation((history: History): Observable<[History, boolean]> => {
  if (cache.has(history.id as string)) {
    cache.set(history.id as string, history);
    return of([cache.get(history.id as string) as History, true]);
  } else {
    return of([history, false]);
  }
});
export const mockCountHistories = jest.fn().mockImplementation((options: Options): Observable<number> => {
  return of(cache.size);
});
// --ADD_METHOD--

const mockHistoryRepository = jest.fn().mockImplementation(() => {
  return {
    createHistory: mockCreateHistory,
    findHistoriesBy: mockFindHistoriesBy,
    updateHistory: mockUpdateHistory,
    deleteHistory: mockDeleteHistory,
    countHistories: mockCountHistories,
    // --APPLY_METHOD--
  };
});

export default mockHistoryRepository;
