import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import SettingRepository from '../../repositories/account/SettingRepository';
import { Options } from '../../../interfaces/repository/options';

export default class CountSettings extends UseCase<number> {
  public options: Options = {};

  constructor(
    private repository: SettingRepository
  ) {
    super();
  }

  protected build(): Observable<number> {
    return this.repository.countSettings(this.options);
  }
}
