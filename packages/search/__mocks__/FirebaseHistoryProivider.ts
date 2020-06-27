import {
  of,
  Observable
} from 'rxjs';
import History from '@unimark/core/lib/domain/entities/search/History';
import { Options } from '@unimark/core/lib/interfaces/repository/options';

export const mockCreateHistory = jest.fn().mockImplementation((history: History): Observable<null> => {
  return of(null);
});

export const mockFindHistoriesBy = jest.fn().mockImplementation((options: Options): Observable<null> => {
  return of(null);
});

export const mockUpdateHistory = jest.fn().mockImplementation((history: History): Observable<null> => {
  return of(null);
});

export const mockDeleteHistory = jest.fn().mockImplementation((history: History): Observable<null> => {
  return of(null);
});

export const mockCountHistories = jest.fn().mockImplementation((options: Options): Observable<null> => {
  return of(null);
});


const mockFirebaseHistoryProvider = jest.fn().mockImplementation(() => {
  return {
    createHistory: mockCreateHistory,
    findHistoriesBy: mockFindHistoriesBy,
    updateHistory: mockUpdateHistory,
    deleteHistory: mockDeleteHistory,
    countHistories: mockCountHistories,
  };
});

export default mockFirebaseHistoryProvider;
