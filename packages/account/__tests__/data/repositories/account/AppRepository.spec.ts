import mockFirebaseAppProvider, {
  mockCreateApp,
  mockFindAppsBy,
  mockUpdateApp,
  mockDeleteApp,
  mockCountApps
} from '../../../../__mocks__/account/FirebaseAppProivider';
import AppRepository from '../../../../src/data/repositories/account/AppRepository';
import App from '@unimark/core/lib/domain/entities/account/App';
import { DEFAULT_APP } from '../../../../__mocks__/account/constant';
import { DEFAULT_FIND_OPTIONS } from '@unimark/core/__mocks__/constant';

describe('AppRepository', () => {
  const repository: AppRepository = new AppRepository(
    (new mockFirebaseAppProvider()) as any,
  );

  beforeEach(() => {
    mockCreateApp.mockClear();
    mockFindAppsBy.mockClear();
    mockUpdateApp.mockClear();
    mockDeleteApp.mockClear();
    mockCountApps.mockClear();
  });


  test('createApp', async () => {
    const _: [App, boolean] = await repository.createApp(DEFAULT_APP).toPromise();
    expect(mockCreateApp).toHaveBeenCalledTimes(1);
    expect(mockCreateApp).toBeCalledWith(DEFAULT_APP);
  });

  test('findAppsBy', async () => {
    const _: App[] = await repository.findAppsBy(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockFindAppsBy).toHaveBeenCalledTimes(1);
    expect(mockFindAppsBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });

  test('updateApp', async () => {
    const _: [App, boolean] = await repository.updateApp(DEFAULT_APP).toPromise();
    expect(mockUpdateApp).toHaveBeenCalledTimes(1);
    expect(mockUpdateApp).toBeCalledWith(DEFAULT_APP);
  });

  test('deleteApp', async () => {
    const _: [App, boolean] = await repository.deleteApp(DEFAULT_APP).toPromise();
    expect(mockDeleteApp).toHaveBeenCalledTimes(1);
    expect(mockDeleteApp).toBeCalledWith(DEFAULT_APP);
  });

  test('countApps', async () => {
    const _: number= await repository.countApps(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockCountApps).toHaveBeenCalledTimes(1);
    expect(mockCountApps).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });
});
