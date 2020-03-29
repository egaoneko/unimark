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

export default class GoogleSearchProvider extends HttpProvider {

  private static QUERY_URL: string = 'https://www.google.com/search?q=';

  constructor(instance: AxiosInstance) {
    super(instance);
  }

  public searchQuery(query: Query): Observable<Result> {
    const result: Result = new Result();
    result.link = `${GoogleSearchProvider.QUERY_URL}${query.word}`;
    result.content = [];

    return of(result);
  }
}