import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import AppRepository from '../../repositories/account/AppRepository';
import { Options } from '../../../interfaces/repository/options';

export default class CountApps extends UseCase<number> {
  public options: Options = {};

  constructor(
    private repository: AppRepository
  ) {
    super();
  }

  protected build(): Observable<number> {
    return this.repository.countApps(this.options);
  }
}
