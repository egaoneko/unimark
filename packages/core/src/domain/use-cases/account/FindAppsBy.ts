import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import App from '../../entities/account/App';
import AppRepository from '../../repositories/account/AppRepository';
import { Options } from '../../../interfaces/repository/options';

export default class FindAppsBy extends UseCase<App[]> {
  public options: Options = {};

  constructor(
    private repository: AppRepository
  ) {
    super();
  }

  protected build(): Observable<App[]> {
    return this.repository.findAppsBy(this.options);
  }
}
