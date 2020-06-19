import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import HistoryRepository from '../../repositories/search/HistoryRepository';
import { Options } from '../../../interfaces/repository/options';

export default class CountHistories extends UseCase<number> {
  public options: Options = {};

  constructor(
    private repository: HistoryRepository
  ) {
    super();
  }

  protected build(): Observable<number> {
    return this.repository.countHistories(this.options);
  }
}
