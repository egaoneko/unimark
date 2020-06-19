import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import History from '../../entities/search/History';
import HistoryRepository from '../../repositories/search/HistoryRepository';
import { Options } from '../../../interfaces/repository/options';

export default class FindHistoriesBy extends UseCase<History[]> {
  public options: Options = {};

  constructor(
    private repository: HistoryRepository
  ) {
    super();
  }

  protected build(): Observable<History[]> {
    return this.repository.findHistoriesBy(this.options);
  }
}
