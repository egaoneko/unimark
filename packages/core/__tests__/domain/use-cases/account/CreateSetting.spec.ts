import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockSettingRepository, {
  mockCreateSetting,
} from '../../../../__mocks__/account/SettingRepository';
import CreateSetting from '../../../../src/domain/use-cases/account/CreateSetting';
import Setting from '../../../../src/domain/entities/account/Setting';
import {
  DEFAULT_SETTING,
} from '../../../../__mocks__/account/constant';

describe('CreateSetting UseCase', () => {
  beforeEach(() => {
    mockSettingRepository.mockClear();
    mockCreateSetting.mockClear();
  });

  test('CreateSetting is called', async() => {
    const repository = new mockSettingRepository();
    const useCase: CreateSetting = new CreateSetting(repository);

    const result: [Setting, boolean] = await apply(useCase, (it: CreateSetting) => it.setting = DEFAULT_SETTING)
      .runOnce(async, queue)
      .toPromise();
    expect(mockCreateSetting).toHaveBeenCalledTimes(1);
    expect(mockCreateSetting).toBeCalledWith(DEFAULT_SETTING);
  });

  test('throw exception without entity', () => {
    const repository = new mockSettingRepository();
    const useCase: CreateSetting = new CreateSetting(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockSettingRepository();
    const useCase: CreateSetting = new CreateSetting(repository);
    const setting: Setting = DEFAULT_SETTING;
    setting.id = null as any;

    expect(() => {
      apply(useCase, ((it: CreateSetting) => it.setting = setting))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid user', () => {
    const repository = new mockSettingRepository();
    const useCase: CreateSetting = new CreateSetting(repository);
    const setting: Setting = DEFAULT_SETTING;
    setting.user = null as any;

    expect(() => {
      apply(useCase, ((it: CreateSetting) => it.setting = setting))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
