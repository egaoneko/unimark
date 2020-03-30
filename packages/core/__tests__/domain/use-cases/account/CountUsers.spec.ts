import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockUserRepository, {
  mockCountUsers,
} from '../../../../__mocks__/account/UserRepository';
import CountUsers from '../../../../src/domain/use-cases/account/CountUsers';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('CountUsers UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockCountUsers.mockClear();
  });

  test('CountUsers is called', async() => {
    const repository = new mockUserRepository();
    const useCase: CountUsers = new CountUsers(repository);

    const result: number = await apply(useCase, (it: CountUsers) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockCountUsers).toHaveBeenCalledTimes(1);
    expect(mockCountUsers).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(result).toBe(1);
  });
});
