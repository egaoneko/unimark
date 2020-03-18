import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';
import Entity from '@unimark/core/lib/domain/entities/Entity';
import FirebaseProvider from '../src/data/providers/FirebaseProvider';
import { DEFAULT_ID } from './account/constant';

export interface TestFirestoreData extends Serializable {
  id?: string;
}

export class TestEntity implements Entity {
  public id!: string;
}

export class TestFirebaseProvider extends FirebaseProvider<TestFirestoreData, TestEntity> {
  protected project(entity: TestEntity): TestFirestoreData {
    return {
    };
  }

  protected unproject(data: TestFirestoreData): TestEntity {
    const test: TestEntity = new TestEntity();
    test.id = data.id as string;
    return test;
  }
}

export const TEST_JSON: TestFirestoreData = {
  id: DEFAULT_ID,
};
export const TEST_ENTITY: TestEntity = new TestEntity();
TEST_ENTITY.id = DEFAULT_ID;

const cache: Map<string, TestFirestoreData> = new Map();
reset();

export function reset(empty: boolean = false): void {
  cache.clear();

  if (empty) {
    return;
  }
  const test: TestFirestoreData = TEST_JSON;
  cache.set(test.id as string, test);
}

export const collection = jest.fn().mockImplementation((path: string) => {
  return {
    add,
    // where,
    // orderBy,
    // startAfter,
    // endBefore,
    // limitToLast,
    // limit,
    doc,
  };
});

export const add = jest.fn().mockImplementation((test: TestFirestoreData) => {
  test = {
    ...test,
    id: DEFAULT_ID,
  };
  cache.set(id, test);
  return Promise.resolve(test);
});

let id: string = '';
export const doc = jest.fn().mockImplementation((_id: string) => {
  id = _id;
  return {
    get,
    set,
  };
});

export const get = jest.fn().mockImplementation((options) => {
  return Promise.resolve({
    exists: cache.has(id),
    data,
  });
});

export const data = jest.fn().mockImplementation((): any => {
  return cache.get(id);
});

export const set = jest.fn().mockImplementation((test: TestFirestoreData): Promise<any> => {
  cache.set(id, test);
  return Promise.resolve();
});

export const clear = () => {
  reset();
  collection.mockClear();
  add.mockClear();
  doc.mockClear();
  get.mockClear();
  set.mockClear();
  id = '';
};