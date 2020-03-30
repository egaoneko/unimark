import {
  Observable,
  of
} from 'rxjs';
import SearchRepositoryInterface from '@unimark/core/lib/domain/repositories/search/SearchRepository';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import Result from '@unimark/core/lib/domain/entities/search/Result';
// --ADD_IMPORT--

export default class SearchRepository implements SearchRepositoryInterface {
  public searchQuery(query: Query): Observable<Result> {
    throw 'Not implements';
  }
  // --ADD_METHOD--
}