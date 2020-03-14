import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import Setting from '../../entities/account/Setting';
import SettingRepository from '../../repositories/account/SettingRepository';
import { Options } from '../../../interfaces/repository/options';

export default class FindSettingsBy extends UseCase<Setting[]> {
  public options: Options = {};

  constructor(
    private repository: SettingRepository
  ) {
    super();
  }

  protected build(): Observable<Setting[]> {
    return this.repository.findSettingsBy(this.options);
  }
}
