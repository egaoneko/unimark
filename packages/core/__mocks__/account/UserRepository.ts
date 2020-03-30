import {
  Observable,
  of
} from 'rxjs';
import User from '../../src/domain/entities/account/User';
import { DEFAULT_USER } from './constant';
import { Options } from '../../src/interfaces/repository/options';
// --ADD_IMPORT--

const cache: Map<string, User> = new Map();
reset();

export function reset(): void {
  cache.clear();

  const user: User = DEFAULT_USER;
  cache.set(user.id, user)
}
// --ADD_UTIL--

let currentUser: User | null;

export function setCurrentUser(user: User | null): void {
  currentUser = user
}

export const mockGetCurrentUser = jest.fn().mockImplementation((): Observable<User | null> => {
  return of(currentUser);
});

let currentUserToken: string | null;

export function setCurrentUserToken(token: string | null): void {
  currentUserToken = token
}

export const mockGetCurrentUserToken = jest.fn().mockImplementation((): Observable<string | null> => {
  return of(currentUserToken);
});

export const mockCreateUser = jest.fn().mockImplementation((user: User): Observable<[User, boolean]> => {
  return of([user, true]);
});
export const mockFindUsersBy = jest.fn().mockImplementation((options: Options): Observable<User[]> => {
  return of(Array.from(cache.values()));
});
export const mockUpdateUser = jest.fn().mockImplementation((user: User): Observable<[User, boolean]> => {
  if (cache.has(user.id as string)) {
    cache.set(user.id as string, user);
    return of([cache.get(user.id as string) as User, true]);
  } else {
    return of([user, false]);
  }
});
export const mockDeleteUser = jest.fn().mockImplementation((user: User): Observable<[User, boolean]> => {
  if (cache.has(user.id as string)) {
    cache.set(user.id as string, user);
    return of([cache.get(user.id as string) as User, true]);
  } else {
    return of([user, false]);
  }
});
export const mockCountUsers = jest.fn().mockImplementation((options: Options): Observable<number> => {
  return of(cache.size);
});
// --ADD_METHOD--

const mockUserRepository = jest.fn().mockImplementation(() => {
  return {
    createUser: mockCreateUser,
    getCurrentUser: mockGetCurrentUser,
    getCurrentUserToken: mockGetCurrentUserToken,
    findUsersBy: mockFindUsersBy,
    updateUser: mockUpdateUser,
    deleteUser: mockDeleteUser,
    countUsers: mockCountUsers,
    // --APPLY_METHOD--
  };
});

export default mockUserRepository;