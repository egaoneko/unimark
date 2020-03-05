import { async } from 'rxjs/internal/scheduler/async';
import mockUserRepository, {
  mockGetCurrentUser,
  setCurrentUser
} from '../../../../__mocks__/account/UserRepository';
import { queue } from 'rxjs/internal/scheduler/queue';
import User from '../../../../src/domain/entities/account/User';
import GetCurrentUser from '../../../../src/domain/use-cases/account/GetCurrentUser';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('GetCurrentUser UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockGetCurrentUser.mockClear();
  });

  test('GetCurrentUser is called', (done) => {
    const repository = new mockUserRepository();
    const useCase: GetCurrentUser = new GetCurrentUser(repository);

    setCurrentUser(DEFAULT_USER);

    useCase.runOnce(async, queue)
      .subscribe((user: User | null) => {
        if (!user) {
          throw 'Can not find user';
        }

        expect(mockGetCurrentUser).toHaveBeenCalledTimes(1);
        expect(user.id).toBe(DEFAULT_USER.id);
        expect(user.email).toBe(DEFAULT_USER.email);
        expect(user.name).toBe(DEFAULT_USER.name);
        expect(user.role).toBe(DEFAULT_USER.role);
        done();
      });
  });

  test('GetCurrentUser is called with empty', (done) => {
    const repository = new mockUserRepository();
    const useCase: GetCurrentUser = new GetCurrentUser(repository);

    setCurrentUser(null);

    useCase.runOnce(async, queue)
      .subscribe((user: User | null) => {
        expect(mockGetCurrentUser).toHaveBeenCalledTimes(1);
        expect(user).toBeNull();
        done();
      });
  });
});
