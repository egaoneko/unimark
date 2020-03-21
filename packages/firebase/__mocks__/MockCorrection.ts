import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';
import Entity from '@unimark/core/lib/domain/entities/Entity';
import FirebaseProvider from '../src/data/providers/FirebaseProvider';
import { DEFAULT_ID } from './constant';
import {
  Observable,
  of
} from 'rxjs';

export interface TestFirestoreData extends Serializable {
  id?: string;
}

export class TestEntity implements Entity {
  public id!: string;
}

export class TestFirebaseProvider extends FirebaseProvider<TestFirestoreData, TestEntity> {
  protected project(entity: TestEntity): Observable<TestFirestoreData> {
    return of({
    });
  }

  protected unproject(data: TestFirestoreData): Observable<TestEntity> {
    const test: TestEntity = new TestEntity();
    test.id = data.id as string;
    return of(test);
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
    where,
    orderBy,
    startAfter,
    endBefore,
    limitToLast,
    limit,
    get,
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

export const where = jest.fn().mockImplementation((field: string, operation: string, value: any) => {
  return {
    where,
    orderBy,
    startAfter,
    endBefore,
    limitToLast,
    limit,
    get,
  };
});

export const orderBy = jest.fn().mockImplementation((field: string, order: string) => {
  return {
    where,
    orderBy,
    startAfter,
    endBefore,
    limitToLast,
    limit,
    get,
  };
});

export const startAfter = jest.fn().mockImplementation((value: any) => {
  return {
    where,
    orderBy,
    startAfter,
    endBefore,
    limitToLast,
    limit,
    get,
  };
});

export const endBefore = jest.fn().mockImplementation((value: any) => {
  return {
    where,
    orderBy,
    startAfter,
    endBefore,
    limitToLast,
    limit,
    get,
  };
});

export const limitToLast = jest.fn().mockImplementation((size: number) => {
  return {
    where,
    orderBy,
    startAfter,
    endBefore,
    limitToLast,
    limit,
    get,
  };
});

export const limit = jest.fn().mockImplementation((size: number) => {
  return {
    where,
    orderBy,
    startAfter,
    endBefore,
    limitToLast,
    limit,
    get,
  };
});

let id: string = '';
export const doc = jest.fn().mockImplementation((_id: string) => {
  id = _id;
  return {
    get,
    set,
    delete: mDelete,
  };
});

export const get = jest.fn().mockImplementation((options) => {
  return Promise.resolve({
    exists: cache.has(id),
    data,
    forEach
  });
});

export const data = jest.fn().mockImplementation((): any => {
  return cache.get(id);
});

export const forEach = jest.fn().mockImplementation((callback): any => {
  return callback({data});
});

export const set = jest.fn().mockImplementation((test: TestFirestoreData): Promise<any> => {
  cache.set(id, test);
  return Promise.resolve();
});

export const mDelete = jest.fn().mockImplementation((test: TestFirestoreData): Promise<any> => {
  cache.delete(id);
  return Promise.resolve();
});

export const clear = () => {
  reset();
  collection.mockClear();
  add.mockClear();
  where.mockClear();
  orderBy.mockClear();
  startAfter.mockClear();
  endBefore.mockClear();
  limitToLast.mockClear();
  limit.mockClear();
  doc.mockClear();
  get.mockClear();
  data.mockClear();
  forEach.mockClear();
  set.mockClear();
  mDelete.mockClear();
  id = '';
};