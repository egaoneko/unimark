import {
  of,
  Observable
} from 'rxjs';
import User from '@unimark/core/lib/domain/entities/account/User';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { DEFAULT_USER } from './constant';

export const mockFindUsersBy = jest.fn().mockImplementation((options: Options): Observable<User[]> => {
  return of([DEFAULT_USER]);
});

const mockFirebaseUserProvider = jest.fn().mockImplementation(() => {
  return {
    findUsersBy: mockFindUsersBy,
  };
});

export default mockFirebaseUserProvider;