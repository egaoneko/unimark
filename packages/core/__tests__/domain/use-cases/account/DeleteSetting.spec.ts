import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockSettingRepository, {
  mockDeleteSetting,
} from '../../../../__mocks__/account/SettingRepository';
import DeleteSetting from '../../../../src/domain/use-cases/account/DeleteSetting';
import Setting from '../../../../src/domain/entities/account/Setting';
import {
  DEFAULT_SETTING,
} from '../../../../__mocks__/account/constant';

describe('DeleteSetting UseCase', () => {
  beforeEach(() => {
    mockSettingRepository.mockClear();
    mockDeleteSetting.mockClear();
  });

  test('DeleteSetting is called', async() => {
    const repository = new mockSettingRepository();
    const useCase: DeleteSetting = new DeleteSetting(repository);

    const result: [Setting, boolean] = await apply(useCase, (it: DeleteSetting) => it.setting = DEFAULT_SETTING)
      .runOnce(async, queue)
      .toPromise();
    expect(mockDeleteSetting).toHaveBeenCalledTimes(1);
    expect(mockDeleteSetting).toBeCalledWith(DEFAULT_SETTING);
  });

  test('throw exception without entity', () => {
    const repository = new mockSettingRepository();
    const useCase: DeleteSetting = new DeleteSetting(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockSettingRepository();
    const useCase: DeleteSetting = new DeleteSetting(repository);
    const setting: Setting = DEFAULT_SETTING.clone();
    setting.id = null as any;

    expect(() => {
      apply(useCase, ((it: DeleteSetting) => it.setting = setting))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
