import mockFirebaseSettingProvider, {
  mockCreateSetting,
  mockFindSettingsBy,
  mockUpdateSetting,
  mockDeleteSetting,
  mockCountSettings
} from '../../../../__mocks__/account/FirebaseSettingProivider';
import SettingRepository from '../../../../src/data/repositories/account/SettingRepository';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import { DEFAULT_SETTING } from '../../../../__mocks__/account/constant';
import { DEFAULT_FIND_OPTIONS } from '@unimark/core/__mocks__/constant';

describe('SettingRepository', () => {
  const repository: SettingRepository = new SettingRepository(
    (new mockFirebaseSettingProvider()) as any,
  );

  beforeEach(() => {
    mockCreateSetting.mockClear();
    mockFindSettingsBy.mockClear();
    mockUpdateSetting.mockClear();
    mockDeleteSetting.mockClear();
    mockCountSettings.mockClear();
  });


  test('createSetting', async () => {
    const _: [Setting, boolean] = await repository.createSetting(DEFAULT_SETTING).toPromise();
    expect(mockCreateSetting).toHaveBeenCalledTimes(1);
    expect(mockCreateSetting).toBeCalledWith(DEFAULT_SETTING);
  });

  test('findSettingsBy', async () => {
    const _: Setting[] = await repository.findSettingsBy(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockFindSettingsBy).toHaveBeenCalledTimes(1);
    expect(mockFindSettingsBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });

  test('updateSetting', async () => {
    const _: [Setting, boolean] = await repository.updateSetting(DEFAULT_SETTING).toPromise();
    expect(mockUpdateSetting).toHaveBeenCalledTimes(1);
    expect(mockUpdateSetting).toBeCalledWith(DEFAULT_SETTING);
  });

  test('deleteSetting', async () => {
    const _: [Setting, boolean] = await repository.deleteSetting(DEFAULT_SETTING).toPromise();
    expect(mockDeleteSetting).toHaveBeenCalledTimes(1);
    expect(mockDeleteSetting).toBeCalledWith(DEFAULT_SETTING);
  });

  test('countSettings', async () => {
    const _: number= await repository.countSettings(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockCountSettings).toHaveBeenCalledTimes(1);
    expect(mockCountSettings).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });
});
