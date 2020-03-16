import { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import { DEFAULT_USER_JSON } from './constant';

const cache: Map<string, UserInterface> = new Map();
reset();

export function reset(empty: boolean = false): void {
  cache.clear();

  if (empty) {
    return;
  }
  const user: UserInterface = DEFAULT_USER_JSON;
  cache.set(user.id as string, user);
}

export const collection = jest.fn().mockImplementation((path: string) => {
  return {
    doc,
  };
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

export const set = jest.fn().mockImplementation((user: UserInterface): Promise<any> => {
  cache.set(id, user);
  return Promise.resolve();
});

export const clear = () => {
  reset();
  collection.mockClear();
  doc.mockClear();
  get.mockClear();
  set.mockClear();
  id = '';
};