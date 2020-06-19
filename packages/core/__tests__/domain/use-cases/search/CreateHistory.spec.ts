import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockHistoryRepository, {
  mockCreateHistory,
} from '../../../../__mocks__/search/HistoryRepository';
import CreateHistory from '../../../../src/domain/use-cases/search/CreateHistory';
import History from '../../../../src/domain/entities/search/History';
import { DEFAULT_HISTORY } from '../../../../__mocks__/search/constant';

describe('CreateHistory UseCase', () => {
  beforeEach(() => {
    mockHistoryRepository.mockClear();
    mockCreateHistory.mockClear();
  });

  test('CreateHistory is called', async() => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);

    const result: [History, boolean] = await apply(useCase, (it: CreateHistory) => it.history = DEFAULT_HISTORY)
      .runOnce(async, queue)
      .toPromise();
    expect(mockCreateHistory).toHaveBeenCalledTimes(1);
    expect(mockCreateHistory).toBeCalledWith(DEFAULT_HISTORY);
  });

  test('throw exception without entity', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid user', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.user = null as any;

    expect(() => {
      apply(useCase, ((it: CreateHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid user', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.user.id = null as any;

    expect(() => {
      apply(useCase, ((it: CreateHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid word', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.word = null as any;

    expect(() => {
      apply(useCase, ((it: CreateHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid engine', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.engine = null as any;

    expect(() => {
      apply(useCase, ((it: CreateHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid link', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.link = null as any;

    expect(() => {
      apply(useCase, ((it: CreateHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid createdAt', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.createdAt = null as any;

    expect(() => {
      apply(useCase, ((it: CreateHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid updatedAt', () => {
    const repository = new mockHistoryRepository();
    const useCase: CreateHistory = new CreateHistory(repository);
    const history: History = DEFAULT_HISTORY.clone();
    history.updatedAt = null as any;

    expect(() => {
      apply(useCase, ((it: CreateHistory) => it.history = history))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
