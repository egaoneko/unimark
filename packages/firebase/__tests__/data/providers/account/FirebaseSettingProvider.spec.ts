import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import FirebaseSettingProvider from '../../../../src/data/providers/account/FirebaseSettingProvider';
import {
  DEFAULT_SETTING,
  DEFAULT_SETTING_FIRESTORE,
} from '../../../../__mocks__/account/constant';
import {
  auth,
  db
} from '../../../../__mocks__/firebase';
import { collection } from '../../../../__mocks__/MockCorrection';
import mockFirebaseUserProvider, { mockFindUsersBy } from '../../../../__mocks__/account/FirebaseUserProivider';

describe('FirebaseSettingProvider', () => {
  const provider: FirebaseSettingProvider = new FirebaseSettingProvider(
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

  test('createSetting', async () => {
    const _: [Setting, boolean] = await provider.createSetting(DEFAULT_SETTING).toPromise();
    expect(createSpyFn).toBeCalledTimes(1);
  });

  test('findSettingsBy', async () => {
    const _: Setting[] = await provider.findSettingsBy({}).toPromise();
    expect(findBySpyFn).toBeCalledTimes(1);
  });

  test('updateSetting', async () => {
    const _: [Setting, boolean] = await provider.updateSetting(DEFAULT_SETTING).toPromise();
    expect(updateSpyFn).toBeCalledTimes(1);
  });

  test('deleteSetting', async () => {
    const _: [Setting, boolean] = await provider.deleteSetting(DEFAULT_SETTING).toPromise();
    expect(deleteSpyFn).toBeCalledTimes(1);
  });

  test('countSettings', async () => {
    const _: number = await provider.countSettings({}).toPromise();
    expect(countSpyFn).toBeCalledTimes(1);
  });

  test('project', async () => {
    expect(await (provider as any).project(DEFAULT_SETTING).toPromise()).toEqual(DEFAULT_SETTING_FIRESTORE);
  });

  test('unproject', async () => {
    expect(
      (await (provider as any).unproject({
        id: DEFAULT_SETTING.id,
        ...DEFAULT_SETTING_FIRESTORE,
      }).toPromise()).equal(DEFAULT_SETTING)
    ).toBeTruthy();
    expect(mockFindUsersBy).toBeCalledTimes(1);
  });
});