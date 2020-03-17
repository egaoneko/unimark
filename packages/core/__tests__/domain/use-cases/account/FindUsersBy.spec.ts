import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockUserRepository, {
  mockFindUsersBy,
} from '../../../../__mocks__/account/UserRepository';
import FindUsersBy from '../../../../src/domain/use-cases/account/FindUsersBy';
import User from '../../../../src/domain/entities/account/User';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('FindUsersBy UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockFindUsersBy.mockClear();
  });

  test('FindUsersBy is called', async() => {
    const repository = new mockUserRepository();
    const useCase: FindUsersBy = new FindUsersBy(repository);

    const results: User[] = await apply(useCase, (it: FindUsersBy) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockFindUsersBy).toHaveBeenCalledTimes(1);
    expect(mockFindUsersBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(results.length).toBe(1);
  });
});
