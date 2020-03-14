import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockSettingRepository, {
  mockUpdateSetting,
} from '../../../../__mocks__/account/SettingRepository';
import UpdateSetting from '../../../../src/domain/use-cases/account/UpdateSetting';
import Setting from '../../../../src/domain/entities/account/Setting';
import {
  DEFAULT_SETTING,
  DEFAULT_USER
} from '../../../../__mocks__/account/constant';

describe('UpdateSetting UseCase', () => {
  beforeEach(() => {
    mockSettingRepository.mockClear();
    mockUpdateSetting.mockClear();
  });

  test('UpdateSetting is called', async() => {
    const repository = new mockSettingRepository();
    const useCase: UpdateSetting = new UpdateSetting(repository);

    const result: [Setting, boolean] = await apply(useCase, (it: UpdateSetting) => it.setting = DEFAULT_SETTING)
      .runOnce(async, queue)
      .toPromise();
    expect(mockUpdateSetting).toHaveBeenCalledTimes(1);
    expect(mockUpdateSetting).toBeCalledWith(DEFAULT_SETTING);
  });

  test('throw exception without entity', () => {
    const repository = new mockSettingRepository();
    const useCase: UpdateSetting = new UpdateSetting(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockSettingRepository();
    const useCase: UpdateSetting = new UpdateSetting(repository);
    const setting: Setting = new Setting(DEFAULT_USER);
    (setting as any).id = null;

    expect(() => {
      apply(useCase, ((it: UpdateSetting) => it.setting = setting))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid user', () => {
    const repository = new mockSettingRepository();
    const useCase: UpdateSetting = new UpdateSetting(repository);
    const setting: Setting = new Setting(null as any);

    expect(() => {
      apply(useCase, ((it: UpdateSetting) => it.setting = setting))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
