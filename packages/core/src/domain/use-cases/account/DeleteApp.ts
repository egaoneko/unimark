import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import App from '../../entities/account/App';
import AppRepository from '../../repositories/account/AppRepository';

export default class DeleteApp extends UseCase<[App, boolean]> {
  public app: App | null = null;

  constructor(
    private repository: AppRepository
  ) {
    super();
  }

  protected build(): Observable<[App, boolean]> {
    return this.repository.deleteApp(this.app as App);
  }

  protected validate(): boolean {
    if (!this.app) {
      return false;
    }

    if (!this.app.id) {
      return false;
    }

    if (!this.app.userId) {
      return false;
    }

    if (!this.app.type) {
      return false;
    }

    return true;
  }
}
