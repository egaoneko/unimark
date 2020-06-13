import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockAppRepository, {
  mockFindAppsBy,
} from '../../../../__mocks__/account/AppRepository';
import FindAppsBy from '../../../../src/domain/use-cases/account/FindAppsBy';
import App from '../../../../src/domain/entities/account/App';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('FindAppsBy UseCase', () => {
  beforeEach(() => {
    mockAppRepository.mockClear();
    mockFindAppsBy.mockClear();
  });

  test('FindAppsBy is called', async() => {
    const repository = new mockAppRepository();
    const useCase: FindAppsBy = new FindAppsBy(repository);

    const results: App[] = await apply(useCase, (it: FindAppsBy) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockFindAppsBy).toHaveBeenCalledTimes(1);
    expect(mockFindAppsBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(results.length).toBe(1);
  });
});
