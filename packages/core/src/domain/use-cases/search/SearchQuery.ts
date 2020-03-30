import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import SearchRepository from '../../repositories/search/SearchRepository';
import Query from '../../entities/search/Query';
import Result from '../../entities/search/Result';
import { SearchEngine } from '../../../enums/search/engine';

export default class SearchQuery extends UseCase<Result> {
  public query: Query | null = null;

  constructor(
    private repository: SearchRepository
  ) {
    super();
  }

  protected build(): Observable<Result> {
    return this.repository.searchQuery(this.query as Query);
  }

  protected validate(): boolean {
    if (!this.query) {
      return false;
    }

    if (!this.query.word) {
      return false;
    }

    if (!(this.query.engine in SearchEngine)) {
      return false;
    }

    return true;
  }
}
