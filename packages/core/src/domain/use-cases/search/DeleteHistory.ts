import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import History from '../../entities/search/History';
import HistoryRepository from '../../repositories/search/HistoryRepository';

export default class DeleteHistory extends UseCase<[History, boolean]> {
  public history: History | null = null;

  constructor(
    private repository: HistoryRepository
  ) {
    super();
  }

  protected build(): Observable<[History, boolean]> {
    return this.repository.deleteHistory(this.history as History);
  }

  protected validate(): boolean {
    if (!this.history) {
      return false;
    }

    if (!this.history.id) {
      return false;
    }

    return true;
  }
}
