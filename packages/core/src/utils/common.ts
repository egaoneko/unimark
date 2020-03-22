import { v4 as uuidV4 } from 'uuid';

export function apply<T>(target: T, applier: (a: T) => void): T {
  applier(target);
  return target;
}

export function lets<T, U>(target: T, player: (it: T) => U): U {
  return player(target);
}

export function uuid(): string {
  return uuidV4();
}

export function equals(a: any, b: any): boolean {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
}

export const NOOP: (...args: any) => any = () => {};