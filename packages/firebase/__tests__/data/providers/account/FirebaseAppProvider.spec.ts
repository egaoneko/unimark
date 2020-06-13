import App from '@unimark/core/lib/domain/entities/account/App';
import FirebaseAppProvider from '../../../../src/data/providers/account/FirebaseAppProvider';
import {
  DEFAULT_APP,
  DEFAULT_APP_FIRESTORE,
} from '../../../../__mocks__/account/constant';
import {
  auth,
  db
} from '../../../../__mocks__/firebase';
import { collection } from '../../../../__mocks__/MockCorrection';
import mockFirebaseUserProvider, { mockFindUsersBy } from '../../../../__mocks__/account/FirebaseUserProivider';

describe('FirebaseAppProvider', () => {
  const provider: FirebaseAppProvider = new FirebaseAppProvider(
    db,
    auth,
    mockFirebaseUserProvider() as any,
  );

  const createSpyFn = jest.spyOn<any, any>(provider, 'create');
  const findBySpyFn = jest.spyOn<any, any>(provider, 'findBy');
  const updateSpyFn = jest.spyOn<any, any>(provider, 'update');
  const deleteSpyFn = jest.spyOn<any, any>(provider, 'delete');
  const countSpyFn = jest.spyOn<any, any>(provider, 'count');
  const projectSpyFn = jest.spyOn<any, any>(provider, 'project');
  const unprojectSpyFn = jest.spyOn<any, any>(provider, 'unproject');

  beforeAll(() => {
    db.setCollection(collection);
  });

  afterAll(() => {
    db.clear();
    auth.clear();
  });

  afterEach(() => {
    createSpyFn.mockClear();
    findBySpyFn.mockClear();
    updateSpyFn.mockClear();
    deleteSpyFn.mockClear();
    countSpyFn.mockClear();
    projectSpyFn.mockClear();
    unprojectSpyFn.mockClear();
    mockFindUsersBy.mockClear();
  });

  test('createApp', async () => {
    const _: [App, boolean] = await provider.createApp(DEFAULT_APP).toPromise();
    expect(createSpyFn).toBeCalledTimes(1);
  });

  test('findAppsBy', async () => {
    const _: App[] = await provider.findAppsBy({}).toPromise();
    expect(findBySpyFn).toBeCalledTimes(1);
  });

  test('updateApp', async () => {
    const _: [App, boolean] = await provider.updateApp(DEFAULT_APP).toPromise();
    expect(updateSpyFn).toBeCalledTimes(1);
  });

  test('deleteApp', async () => {
    const _: [App, boolean] = await provider.deleteApp(DEFAULT_APP).toPromise();
    expect(deleteSpyFn).toBeCalledTimes(1);
  });

  test('countApps', async () => {
    const _: number = await provider.countApps({}).toPromise();
    expect(countSpyFn).toBeCalledTimes(1);
  });

  test('project', async () => {
    expect(await (provider as any).project(DEFAULT_APP).toPromise()).toEqual(DEFAULT_APP_FIRESTORE);
  });

  test('unproject', async () => {
    expect(
      (await (provider as any).unproject({
        id: DEFAULT_APP.id,
        ...DEFAULT_APP_FIRESTORE,
      }).toPromise()).equal(DEFAULT_APP)
    ).toBeTruthy();
    expect(mockFindUsersBy).toBeCalledTimes(1);
  });
});
