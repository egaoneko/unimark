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
  update,
  mDelete,
  data,
  TestFirestoreData,
  where,
  orderBy,
  startAfter,
  endBefore,
  limitToLast,
  limit,
  forEach,
  TEST_ENTITY,
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
    db.setCollection(collection);
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
    const test: TestFirestoreData = new TestEntity();
    const [_, success]: [TestEntity, boolean] = await (provider as any).create(test).toPromise();
    expect(success).toBeTruthy();

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(add).toHaveBeenCalledTimes(1);
    expect(projectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('create with id', async () => {
    reset(true);
    const [_, success]: [TestEntity, boolean] = await (provider as any).create(TEST_ENTITY).toPromise();
    expect(success).toBeTruthy();

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toBeCalledWith(DEFAULT_ID);
    expect(set).toHaveBeenCalledTimes(1);
    expect(projectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('findBy with last', async () => {
    const list: TestEntity[] = await (provider as any).findBy({
      where: [['a', '>', 'test'], ['b', '<', 1]],
      sort: [['a', 'desc'], ['b', 'asc']],
      last: 'test',
      limit: 1
    }).toPromise();
    expect(list.length).toBe(1);

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(where).toHaveBeenCalledTimes(2);
    expect(where.mock.calls[0]).toEqual(['a', '>', 'test']);
    expect(where.mock.calls[1]).toEqual(['b', '<', 1]);
    expect(orderBy).toHaveBeenCalledTimes(2);
    expect(orderBy.mock.calls[0]).toEqual(['a', 'desc']);
    expect(orderBy.mock.calls[1]).toEqual(['b', 'asc']);
    expect(startAfter).toHaveBeenCalledTimes(1);
    expect(startAfter).toBeCalledWith('test');
    expect(limit).toHaveBeenCalledTimes(1);
    expect(limit).toBeCalledWith(1);
    expect(get).toHaveBeenCalledTimes(1);
    expect(forEach).toHaveBeenCalledTimes(1);
    expect(data).toHaveBeenCalledTimes(1);
    expect(unprojectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('findBy with first', async () => {
    const list: TestEntity[] = await (provider as any).findBy({
      where: [['a', '>', 'test'], ['b', '<', 1]],
      sort: [['a', 'desc'], ['b', 'asc']],
      first: 'test',
      limit: 1
    }).toPromise();
    expect(list.length).toBe(1);

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(where).toHaveBeenCalledTimes(2);
    expect(where.mock.calls[0]).toEqual(['a', '>', 'test']);
    expect(where.mock.calls[1]).toEqual(['b', '<', 1]);
    expect(orderBy).toHaveBeenCalledTimes(2);
    expect(orderBy.mock.calls[0]).toEqual(['a', 'desc']);
    expect(orderBy.mock.calls[1]).toEqual(['b', 'asc']);
    expect(endBefore).toHaveBeenCalledTimes(1);
    expect(endBefore).toBeCalledWith('test');
    expect(limitToLast).toHaveBeenCalledTimes(1);
    expect(limitToLast).toBeCalledWith(1);
    expect(get).toHaveBeenCalledTimes(1);
    expect(forEach).toHaveBeenCalledTimes(1);
    expect(data).toHaveBeenCalledTimes(1);
    expect(unprojectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('findBy with id', async () => {
    const list: TestEntity[] = await (provider as any).findBy({
      id: DEFAULT_ID,
    }).toPromise();
    expect(list.length).toBe(1);

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toBeCalledWith(DEFAULT_ID);
    expect(get).toHaveBeenCalledTimes(1);
    expect(data).toHaveBeenCalledTimes(1);
    expect(unprojectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('update', async () => {
    const [_, success]: [TestEntity, boolean] = await (provider as any).update(TEST_ENTITY).toPromise();
    expect(success).toBeTruthy();

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toBeCalledWith(DEFAULT_ID);
    expect(update).toHaveBeenCalledTimes(1);
    expect(projectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('update without id', async () => {
    expect(() => {
      const test: TestFirestoreData = new TestEntity();
      (provider as any).update(test).toPromise();
    }).toThrowError('Invalid entity: empty id');
  });

  test('delete', async () => {
    const [_, success]: [TestEntity, boolean] = await (provider as any).delete(TEST_ENTITY).toPromise();
    expect(success).toBeTruthy();

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toBeCalledWith(DEFAULT_ID);
    expect(mDelete).toHaveBeenCalledTimes(1);
  });

  test('delete without id', async () => {
    expect(() => {
      const test: TestFirestoreData = new TestEntity();
      (provider as any).delete(test).toPromise();
    }).toThrowError('Invalid entity: empty id');
  });

  test('count with last', async () => {
    const count: number = await (provider as any).count({
      where: [['a', '>', 'test'], ['b', '<', 1]],
      sort: [['a', 'desc'], ['b', 'asc']],
      last: 'test',
      limit: 1
    }).toPromise();
    expect(count).toBe(1);

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(where).toHaveBeenCalledTimes(2);
    expect(where.mock.calls[0]).toEqual(['a', '>', 'test']);
    expect(where.mock.calls[1]).toEqual(['b', '<', 1]);
    expect(orderBy).toHaveBeenCalledTimes(2);
    expect(orderBy.mock.calls[0]).toEqual(['a', 'desc']);
    expect(orderBy.mock.calls[1]).toEqual(['b', 'asc']);
    expect(startAfter).toHaveBeenCalledTimes(1);
    expect(startAfter).toBeCalledWith('test');
    expect(limit).toHaveBeenCalledTimes(1);
    expect(limit).toBeCalledWith(1);
    expect(get).toHaveBeenCalledTimes(1);
    expect(forEach).toHaveBeenCalledTimes(1);
    expect(data).toHaveBeenCalledTimes(1);
    expect(unprojectSpyFn).toHaveBeenCalledTimes(1);
  });

  test('count with first', async () => {
    const count: number = await (provider as any).count({
      where: [['a', '>', 'test'], ['b', '<', 1]],
      sort: [['a', 'desc'], ['b', 'asc']],
      first: 'test',
      limit: 1
    }).toPromise();
    expect(count).toBe(1);

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('tests');
    expect(where).toHaveBeenCalledTimes(2);
    expect(where.mock.calls[0]).toEqual(['a', '>', 'test']);
    expect(where.mock.calls[1]).toEqual(['b', '<', 1]);
    expect(orderBy).toHaveBeenCalledTimes(2);
    expect(orderBy.mock.calls[0]).toEqual(['a', 'desc']);
    expect(orderBy.mock.calls[1]).toEqual(['b', 'asc']);
    expect(endBefore).toHaveBeenCalledTimes(1);
    expect(endBefore).toBeCalledWith('test');
    expect(limitToLast).toHaveBeenCalledTimes(1);
    expect(limitToLast).toBeCalledWith(1);
    expect(get).toHaveBeenCalledTimes(1);
    expect(forEach).toHaveBeenCalledTimes(1);
    expect(data).toHaveBeenCalledTimes(1);
    expect(unprojectSpyFn).toHaveBeenCalledTimes(1);
  });
});