import {
  Observable,
  of
} from 'rxjs';
import Setting from '../../src/domain/entities/account/Setting';
import { Options } from '../../src/interfaces/repository/options';
import { DEFAULT_SETTING } from './constant';
// --ADD_IMPORT--

const cache: Map<string, Setting> = new Map();
reset();

export function reset(empty: boolean = false): void {
  cache.clear();

  if (empty) {
    return;
  }
  const setting: Setting = DEFAULT_SETTING;
  cache.set(setting.id as string, setting);
}
// --ADD_UTIL--

export const mockCreateSetting = jest.fn().mockImplementation((setting: Setting): Observable<[Setting, boolean]> => {
  if (cache.has(setting.id as string)) {
    return of([cache.get(setting.id as string) as Setting, false]);
  } else {
    cache.set(setting.id as string, setting);
    return of([setting, true]);
  }
});
export const mockFindSettingsBy = jest.fn().mockImplementation((options: Options): Observable<Setting[]> => {
  return of(Array.from(cache.values()));
});
export const mockUpdateSetting = jest.fn().mockImplementation((setting: Setting): Observable<[Setting, boolean]> => {
  if (cache.has(setting.id as string)) {
    cache.set(setting.id as string, setting);
    return of([cache.get(setting.id as string) as Setting, true]);
  } else {
    return of([setting, false]);
  }
});
export const mockDeleteSetting = jest.fn().mockImplementation((setting: Setting): Observable<[Setting, boolean]> => {
  if (cache.has(setting.id as string)) {
    cache.set(setting.id as string, setting);
    return of([cache.get(setting.id as string) as Setting, true]);
  } else {
    return of([setting, false]);
  }
});
export const mockCountSettings = jest.fn().mockImplementation((options: Options): Observable<number> => {
  return of(cache.size);
});
// --ADD_METHOD--

const mockSettingRepository = jest.fn().mockImplementation(() => {
  return {
    createSetting: mockCreateSetting,
    findSettingsBy: mockFindSettingsBy,
    updateSetting: mockUpdateSetting,
    deleteSetting: mockDeleteSetting,
    countSettings: mockCountSettings,
    // --APPLY_METHOD--
  };
});

export default mockSettingRepository;