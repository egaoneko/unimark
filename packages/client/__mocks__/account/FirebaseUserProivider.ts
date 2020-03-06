import {
  of,
  Observable
} from 'rxjs';
import User from '@unimark/core/lib/domain/entities/account/User';
import { DEFAULT_USER } from './constant';

export const mockFindUserById = jest.fn().mockImplementation((id: string): Observable<User | null> => {
  if (DEFAULT_USER.id !== id) {
    return of(null);
  }

  return of(DEFAULT_USER);
});

export const mockCreateUser = jest.fn().mockImplementation((user: User): Observable<[User, boolean]> => {
  return of([user, true]);
});

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

const mockFirebaseUserProvider = jest.fn().mockImplementation(() => {
  return {
    createUser: mockCreateUser,
    findUserById: mockFindUserById,
    getCurrentUser: mockGetCurrentUser,
    getCurrentUserToken: mockGetCurrentUserToken,
  };
});

export default mockFirebaseUserProvider;