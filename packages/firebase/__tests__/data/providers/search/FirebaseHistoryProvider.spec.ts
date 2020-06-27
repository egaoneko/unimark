import History from '@unimark/core/lib/domain/entities/search/History';
import FirebaseHistoryProvider from '../../../../src/data/providers/search/FirebaseHistoryProvider';
import {
  DEFAULT_HISTORY,
  DEFAULT_HISTORY_FIRESTORE,
} from '../../../../__mocks__/search/constant';
import {
  auth,
  db
} from '../../../../__mocks__/firebase';
import { collection } from '../../../../__mocks__/MockCorrection';
import mockFirebaseUserProvider, { mockFindUsersBy } from '../../../../__mocks__/account/FirebaseUserProivider';

describe('FirebaseHistoryProvider', () => {
  const provider: FirebaseHistoryProvider = new FirebaseHistoryProvider(
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

  test('createHistory', async () => {
    const _: [History, boolean] = await provider.createHistory(DEFAULT_HISTORY).toPromise();
    expect(createSpyFn).toBeCalledTimes(1);
  });

  test('findHistoriesBy', async () => {
    const _: History[] = await provider.findHistoriesBy({}).toPromise();
    expect(findBySpyFn).toBeCalledTimes(1);
  });

  test('updateHistory', async () => {
    const _: [History, boolean] = await provider.updateHistory(DEFAULT_HISTORY).toPromise();
    expect(updateSpyFn).toBeCalledTimes(1);
  });

  test('deleteHistory', async () => {
    const _: [History, boolean] = await provider.deleteHistory(DEFAULT_HISTORY).toPromise();
    expect(deleteSpyFn).toBeCalledTimes(1);
  });

  test('countHistories', async () => {
    const _: number = await provider.countHistories({}).toPromise();
    expect(countSpyFn).toBeCalledTimes(1);
  });

  test('project', async () => {
    expect(await (provider as any).project(DEFAULT_HISTORY).toPromise()).toEqual(DEFAULT_HISTORY_FIRESTORE);
  });

  test('unproject', async () => {
    expect(
      (await (provider as any).unproject({
        id: DEFAULT_HISTORY.id,
        ...DEFAULT_HISTORY_FIRESTORE,
      }).toPromise()).equal(DEFAULT_HISTORY)
    ).toBeTruthy();
    expect(mockFindUsersBy).toBeCalledTimes(1);
  });
});
