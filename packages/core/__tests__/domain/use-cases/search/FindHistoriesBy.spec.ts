import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockHistoryRepository, {
  mockFindHistoriesBy,
} from '../../../../__mocks__/search/HistoryRepository';
import FindHistoriesBy from '../../../../src/domain/use-cases/search/FindHistoriesBy';
import History from '../../../../src/domain/entities/search/History';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('FindHistoriesBy UseCase', () => {
  beforeEach(() => {
    mockHistoryRepository.mockClear();
    mockFindHistoriesBy.mockClear();
  });

  test('FindHistoriesBy is called', async() => {
    const repository = new mockHistoryRepository();
    const useCase: FindHistoriesBy = new FindHistoriesBy(repository);

    const results: History[] = await apply(useCase, (it: FindHistoriesBy) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockFindHistoriesBy).toHaveBeenCalledTimes(1);
    expect(mockFindHistoriesBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(results.length).toBe(1);
  });
});
