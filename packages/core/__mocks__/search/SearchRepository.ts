import {
  Observable,
  of
} from 'rxjs';
import Query from '../../src/domain/entities/search/Query';
import Result from '../../src/domain/entities/search/Result';
import { DEFAULT_RESULT } from './constant';
// --ADD_IMPORT--

// --ADD_UTIL--

export const mockSearchQuery = jest.fn().mockImplementation((query: Query): Observable<Result> => {
  return of(DEFAULT_RESULT);
});
// --ADD_METHOD--

const mockSearchRepository = jest.fn().mockImplementation(() => {
  return {
    searchQuery: mockSearchQuery,
    // --APPLY_METHOD--
  };
});

export default mockSearchRepository;