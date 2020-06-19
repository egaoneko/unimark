import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockHistoryRepository, {
  mockDeleteHistory,
} from '../../../../__mocks__/search/HistoryRepository';
import DeleteHistory from '../../../../src/domain/use-cases/search/DeleteHistory';
import History from '../../../../src/domain/entities/search/History';
import { DEFAULT_HISTORY } from '../../../../__mocks__/search/constant';

describe('DeleteHistory UseCase', () => {
  beforeEach(() => {
    mockHistoryRepository.mockClear();
    mockDeleteHistory.mockClear();
  });

  test('DeleteHistory is called', async() => {
    const repository = new mockHistoryRepository();
    const useCase: DeleteHistory = new DeleteHistory(repository);

    const result: [History, boolean] = await apply(useCase, (it: DeleteHistory) => it.history = DEFAULT_HISTORY)
      .runOnce(async, queue)
      .toPromise();
    expect(mockDeleteHistory).toHaveBeenCalledTimes(1);
    expect(mockDeleteHistory).toBeCalledWith(DEFAULT_HISTORY);
  });

  test('throw exception without entity', () => {
    const repository = new mockHistoryRepository();
    const useCase: DeleteHistory = new DeleteHistory(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockHistoryRepository();
    const useCase: DeleteHistory = new DeleteHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.id = null as any;

    expect(() => {
      apply(useCase, ((it: DeleteHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
