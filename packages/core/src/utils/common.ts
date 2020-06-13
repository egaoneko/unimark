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

export function NOOP(...args: any): any {
}

export function deepClone<T>(obj: T): T {
  if (obj === null) {
    return obj;
  }

  const origin: any = obj;
  let clone: any = Object.assign({}, origin);

  Object.keys(clone).forEach(
    key => (clone[key] = typeof origin[key] === 'object' ? deepClone(origin[key]) : origin[key])
  );
  return Array.isArray(origin) && origin.length
    ? (clone.length = origin.length) && Array.from(clone)
    : Array.isArray(origin)
      ? Array.from(origin)
      : clone;
}
