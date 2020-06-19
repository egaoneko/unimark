import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import History from '../../entities/search/History';
import HistoryRepository from '../../repositories/search/HistoryRepository';

export default class CreateHistory extends UseCase<[History, boolean]> {
  public history: History | null = null;

  constructor(
    private repository: HistoryRepository
  ) {
    super();
  }

  protected build(): Observable<[History, boolean]> {
    return this.repository.createHistory(this.history as History);
  }

  protected validate(): boolean {
    if (!this.history) {
      return false;
    }

    if (!this.history.user) {
      return false;
    }

    if (!this.history.user.id) {
      return false;
    }

    if (!this.history.word) {
      return false;
    }

    if (!this.history.engine) {
      return false;
    }

    if (!this.history.link) {
      return false;
    }

    if (!this.history.createdAt) {
      return false;
    }

    if (!this.history.updatedAt) {
      return false;
    }

    return true;
  }
}
