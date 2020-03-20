import {
  of,
  Observable
} from 'rxjs';
import User from '@unimark/core/lib/domain/entities/account/User';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { DEFAULT_USER } from './constant';

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

export const mockCreateUser = jest.fn().mockImplementation((user: User): Observable<null> => {
  return of(null);
});

export const mockFindUsersBy = jest.fn().mockImplementation((options: Options): Observable<User[]> => {
  return of([DEFAULT_USER]);
});

export const mockUpdateUser = jest.fn().mockImplementation((user: User): Observable<null> => {
  return of(null);
});

export const mockDeleteUser = jest.fn().mockImplementation((user: User): Observable<null> => {
  return of(null);
});

export const mockCountUsers = jest.fn().mockImplementation((options: Options): Observable<null> => {
  return of(null);
});


const mockFirebaseUserProvider = jest.fn().mockImplementation(() => {
  return {
    getCurrentUser: mockGetCurrentUser,
    getCurrentUserToken: mockGetCurrentUserToken,
    createUser: mockCreateUser,
    findUsersBy: mockFindUsersBy,
    updateUser: mockUpdateUser,
    deleteUser: mockDeleteUser,
    countUsers: mockCountUsers,
  };
});

export default mockFirebaseUserProvider;