import FirebaseProvider from '../../../src/data/providers/FirebaseProvider';
import {
  auth,
  db
} from '../../../__mocks__/firebase';
import {
  clear,
  reset,
  collection,
  add,
  doc,
  get,
  set,
  data,
  TestFirestoreData,
} from '../../../__mocks__/MockCorrection';
import {
  TestEntity,
  TestFirebaseProvider
} from '../../../__mocks__/MockCorrection';
import { DEFAULT_ID } from '../../../__mocks__/constant';

describe('FirebaseProvider', () => {
  const provider: TestFirebaseProvider = new TestFirebaseProvider(
    db,
    auth,
    'tests',
  );
  const projectSpyFn = jest.spyOn<any, any>(provider, 'project');
  const unprojectSpyFn = jest.spyOn<any, any>(provider, 'unproject');

  beforeAll(() => {
    db.setCollection(collection)
  });

  afterAll(() => {
    db.clear();
    auth.clear();
  });

  afterEach(() => {
    clear();
    projectSpyFn.mockClear();
    unprojectSpyFn.mockClear();
  });

  test('create without id', async () => {
    reset(true);
    const test: TestFirestoreData = {};

    const [_, success]: [TestEntity, boolean] = await (provider as any).create(test).toPromise();
    expect(success).toBeTruthy();

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(add).toHaveBeenCalledTimes(1);
    expect(projectSpyFn).toHaveBeenCalledTimes(1);
    expect(unprojectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('create with id', async () => {
    reset(true);
    const test: TestFirestoreData = {
      id: DEFAULT_ID,
    };
    const [_, success]: [TestEntity, boolean] = await (provider as any).create(test).toPromise();
    expect(success).toBeTruthy();

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toBeCalledWith(DEFAULT_ID);
    expect(set).toHaveBeenCalledTimes(1);
    expect(projectSpyFn).toHaveBeenCalledTimes(1);
    expect(unprojectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('findBy', async () => {
    reset(true);
    const list: TestEntity[] = await (provider as any).findBy({}).toPromise();
    // TODO Here
  });
});