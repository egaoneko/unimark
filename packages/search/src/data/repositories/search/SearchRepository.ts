import {
  Observable,
  of
} from 'rxjs';
import SearchRepositoryInterface from '@unimark/core/lib/domain/repositories/search/SearchRepository';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import GoogleSearchProvider from '../../providers/search/GoogleSearchProvider';
import NaverSearchProvider from '../../providers/search/NaverSearchProvider';
import { APPLICATION_ERROR_FACTORY } from '@unimark/core/lib/data/errors/factories';
import ErrorType from '@unimark/core/lib/error/ErrorType';
// --ADD_IMPORT--

export default class SearchRepository implements SearchRepositoryInterface {

  constructor(
    private google: GoogleSearchProvider,
    private naver: NaverSearchProvider,
  ) {
  }

  public searchQuery(query: Query): Observable<Result> {
    switch (query.engine) {
      case SearchEngine.GOOGLE:
        return this.google.searchQuery(query);
      case SearchEngine.NAVER:
        return this.naver.searchQuery(query);
    }
    throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid params in Query');
  }

  // --ADD_METHOD--
}