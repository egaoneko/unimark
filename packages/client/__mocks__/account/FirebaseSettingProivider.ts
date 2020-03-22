import {
  of,
  Observable
} from 'rxjs';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import { Options } from '@unimark/core/lib/interfaces/repository/options';

export const mockCreateSetting = jest.fn().mockImplementation((setting: Setting): Observable<null> => {
  return of(null);
});

export const mockFindSettingsBy = jest.fn().mockImplementation((options: Options): Observable<null> => {
  return of(null);
});

export const mockUpdateSetting = jest.fn().mockImplementation((setting: Setting): Observable<null> => {
  return of(null);
});

export const mockDeleteSetting = jest.fn().mockImplementation((setting: Setting): Observable<null> => {
  return of(null);
});

export const mockCountSettings = jest.fn().mockImplementation((options: Options): Observable<null> => {
  return of(null);
});


const mockFirebaseSettingProvider = jest.fn().mockImplementation(() => {
  return {
    createSetting: mockCreateSetting,
    findSettingsBy: mockFindSettingsBy,
    updateSetting: mockUpdateSetting,
    deleteSetting: mockDeleteSetting,
    countSettings: mockCountSettings,
  };
});

export default mockFirebaseSettingProvider;