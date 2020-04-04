import {
  AxiosInstance,
} from 'axios';
import {
  Observable,
  of
} from 'rxjs';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import HttpProvider from '@unimark/core/lib/data/providers/HttpProvider';
import Result from '@unimark/core/lib/domain/entities/search/Result';

export default class NaverSearchProvider extends HttpProvider {

  private static QUERY_URL: string = 'https://search.naver.com/search.naver?query=';

  constructor(instance: AxiosInstance) {
    super(instance);
  }

  public searchQuery(query: Query): Observable<Result> {
    const result: Result = new Result();
    result.link = `${NaverSearchProvider.QUERY_URL}${query.word}`;
    result.content = [];

    return of(result);
  }
}