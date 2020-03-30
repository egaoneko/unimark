import { Observable } from 'rxjs';
import UseCase from '../UseCase';
import Setting from '../../entities/account/Setting';
import SettingRepository from '../../repositories/account/SettingRepository';

export default class CreateSetting extends UseCase<[Setting, boolean]> {
  public setting: Setting | null = null;

  constructor(
    private repository: SettingRepository
  ) {
    super();
  }

  protected build(): Observable<[Setting, boolean]> {
    return this.repository.createSetting(this.setting as Setting);
  }

  protected validate(): boolean {
    if (!this.setting) {
      return false;
    }

    if (!this.setting.user) {
      return false;
    }

    return true;
  }
}
