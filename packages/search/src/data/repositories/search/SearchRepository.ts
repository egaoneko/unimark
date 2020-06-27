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
import HistoryRepository from './HistoryRepository';
import History from '@unimark/core/lib/domain/entities/search/History';
import {
  first,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
// --ADD_IMPORT--

export default class SearchRepository implements SearchRepositoryInterface {

  constructor(
    private google: GoogleSearchProvider,
    private naver: NaverSearchProvider,
    private history: HistoryRepository,
  ) {
  }

  public searchQuery(query: Query): Observable<Result> {
    let result: Observable<Result>;
    switch (query.engine) {
      case SearchEngine.GOOGLE:
        result = this.google.searchQuery(query);
        break;
      case SearchEngine.NAVER:
        result = this.naver.searchQuery(query);
        break;
    }

    if (!result) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid params in Query');
    }

    return result
      .pipe(
        tap(result => {
          if (!query.user) {
            return;
          }

          this.history.findHistoriesBy({
            where: [
              ['userId', '==', query.user.id],
              ['word', '==', query.word],
              ['engine', '==', query.engine],
            ],
            sort: [
              ['updatedAt', 'desc']
            ],
          }).pipe(
            switchMap(histories => {
              if (!query.user) {
                return of(null);
              }

              let history: History;

              if (histories.length > 0) {
                history = histories[0];
                history.updatedAt = Date.now();
                return this.history.updateHistory(history);
              }

              history = new History();
              history.user = query.user;
              history.word = query.word;
              history.engine = query.engine;
              history.link = result.link;

              return this.history.createHistory(history);
            }),
            first(),
          ).subscribe(() => {
          });
        })
      );
  }

  // --ADD_METHOD--
}
