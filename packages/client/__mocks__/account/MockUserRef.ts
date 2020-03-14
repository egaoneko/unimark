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

let id: string = '';
export const ref = jest.fn().mockImplementation((path: string) => {
  id = path.split('/')[1];
  return {
    once,
    set,
  };
});

export const once = jest.fn().mockImplementation((eventType: string) => {
  return Promise.resolve({
    hasChildren,
    toJSON,
  });
});

export const hasChildren = jest.fn().mockImplementation(() => {
  return cache.has(id);
});

export const toJSON = jest.fn().mockImplementation(() => {
  return cache.get(id);
});

export const set = jest.fn().mockImplementation((user: UserInterface): Promise<any> => {
  return Promise.resolve(null);
});

export const clear = () => {
  reset();
  ref.mockClear();
  once.mockClear();
  set.mockClear();
  hasChildren.mockClear();
  toJSON.mockClear();
  id = '';
};