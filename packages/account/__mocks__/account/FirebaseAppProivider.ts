import {
  of,
  Observable
} from 'rxjs';
import App from '@unimark/core/lib/domain/entities/account/App';
import { Options } from '@unimark/core/lib/interfaces/repository/options';

export const mockCreateApp = jest.fn().mockImplementation((app: App): Observable<null> => {
  return of(null);
});

export const mockFindAppsBy = jest.fn().mockImplementation((options: Options): Observable<null> => {
  return of(null);
});

export const mockUpdateApp = jest.fn().mockImplementation((app: App): Observable<null> => {
  return of(null);
});

export const mockDeleteApp = jest.fn().mockImplementation((app: App): Observable<null> => {
  return of(null);
});

export const mockCountApps = jest.fn().mockImplementation((options: Options): Observable<null> => {
  return of(null);
});


const mockFirebaseAppProvider = jest.fn().mockImplementation(() => {
  return {
    createApp: mockCreateApp,
    findAppsBy: mockFindAppsBy,
    updateApp: mockUpdateApp,
    deleteApp: mockDeleteApp,
    countApps: mockCountApps,
  };
});

export default mockFirebaseAppProvider;
