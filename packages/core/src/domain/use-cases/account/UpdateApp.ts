import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import App from '../../entities/account/App';
import AppRepository from '../../repositories/account/AppRepository';

export default class UpdateApp extends UseCase<[App, boolean]> {
  public app: App | null = null;

  constructor(
    private repository: AppRepository
  ) {
    super();
  }

  protected build(): Observable<[App, boolean]> {
    return this.repository.updateApp(this.app as App);
  }

  protected validate(): boolean {
    if (!this.app) {
      return false;
    }

    if (!this.app.id) {
      return false;
    }

    if (!this.app.user) {
      return false;
    }

    if (!this.app.type) {
      return false;
    }

    return true;
  }
}
