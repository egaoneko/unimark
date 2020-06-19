import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockHistoryRepository, {
  mockCountHistories,
} from '../../../../__mocks__/search/HistoryRepository';
import CountHistories from '../../../../src/domain/use-cases/search/CountHistories';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('CountHistories UseCase', () => {
  beforeEach(() => {
    mockHistoryRepository.mockClear();
    mockCountHistories.mockClear();
  });

  test('CountHistories is called', async() => {
    const repository = new mockHistoryRepository();
    const useCase: CountHistories = new CountHistories(repository);

    const result: number = await apply(useCase, (it: CountHistories) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockCountHistories).toHaveBeenCalledTimes(1);
    expect(mockCountHistories).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(result).toBe(1);
  });
});
