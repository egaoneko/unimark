import {
  Observable,
  of
} from 'rxjs';
import App from '../../src/domain/entities/account/App';
import { Options } from '../../src/interfaces/repository/options';
import { DEFAULT_APP } from './constant';
// --ADD_IMPORT--

const cache: Map<string, App> = new Map();
reset();

export function reset(empty: boolean = false): void {
  cache.clear();

  if (empty) {
    return;
  }
  const app: App = DEFAULT_APP;
  cache.set(app.id as string, app);
}
// --ADD_UTIL--

export const mockCreateApp = jest.fn().mockImplementation((app: App): Observable<[App, boolean]> => {
  if (cache.has(app.id as string)) {
    return of([cache.get(app.id as string) as App, false]);
  } else {
    cache.set(app.id as string, app);
    return of([app, true]);
  }
});
export const mockFindAppsBy = jest.fn().mockImplementation((options: Options): Observable<App[]> => {
  return of(Array.from(cache.values()));
});
export const mockUpdateApp = jest.fn().mockImplementation((app: App): Observable<[App, boolean]> => {
  if (cache.has(app.id as string)) {
    cache.set(app.id as string, app);
    return of([cache.get(app.id as string) as App, true]);
  } else {
    return of([app, false]);
  }
});
export const mockDeleteApp = jest.fn().mockImplementation((app: App): Observable<[App, boolean]> => {
  if (cache.has(app.id as string)) {
    cache.set(app.id as string, app);
    return of([cache.get(app.id as string) as App, true]);
  } else {
    return of([app, false]);
  }
});
export const mockCountApps = jest.fn().mockImplementation((options: Options): Observable<number> => {
  return of(cache.size);
});
// --ADD_METHOD--

const mockAppRepository = jest.fn().mockImplementation(() => {
  return {
    createApp: mockCreateApp,
    findAppsBy: mockFindAppsBy,
    updateApp: mockUpdateApp,
    deleteApp: mockDeleteApp,
    countApps: mockCountApps,
    // --APPLY_METHOD--
  };
});

export default mockAppRepository;
