import { async } from 'rxjs/internal/scheduler/async';
import mockUserRepository, {
  mockGetCurrentUserToken,
  setCurrentUserToken
} from '../../../../__mocks__/account/UserRepository';
import { queue } from 'rxjs/internal/scheduler/queue';
import GetCurrentUserToken from '../../../../src/domain/use-cases/account/GetCurrentUserToken';

describe('GetCurrentUserToken UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockGetCurrentUserToken.mockClear();
  });

  test('GetCurrentUserToken is called', (done) => {
    const repository = new mockUserRepository();
    const useCase: GetCurrentUserToken = new GetCurrentUserToken(repository);

    setCurrentUserToken('1234');

    useCase.runOnce(async, queue)
      .subscribe((token: string | null) => {
        if (!token) {
          throw 'Can not find user token';
        }

        expect(mockGetCurrentUserToken).toHaveBeenCalledTimes(1);
        expect(token).toBe('1234');
        done();
      });
  });

  test('GetCurrentUserToken is called with empty', (done) => {
    const repository = new mockUserRepository();
    const useCase: GetCurrentUserToken = new GetCurrentUserToken(repository);

    setCurrentUserToken(null);

    useCase.runOnce(async, queue)
      .subscribe((token: string | null) => {
        expect(mockGetCurrentUserToken).toHaveBeenCalledTimes(1);
        expect(token).toBeNull();
        done();
      });
  });
});
