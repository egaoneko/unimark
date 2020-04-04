import {
  of,
  Observable
} from 'rxjs';
import {
  DEFAULT_RESULT
} from './constant';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import Result from '@unimark/core/lib/domain/entities/search/Result';

export const mockSearchQuery = jest.fn().mockImplementation((query: Query): Observable<Result> => {
  return of(DEFAULT_RESULT);
});

const mockNaverSearchProvider = jest.fn().mockImplementation(() => {
  return {
    searchQuery: mockSearchQuery,
  };
});

export default mockNaverSearchProvider;