import mockFirebaseHistoryProvider, {
  mockCreateHistory,
  mockFindHistoriesBy,
  mockUpdateHistory,
  mockDeleteHistory,
  mockCountHistories
} from '../../../../__mocks__/FirebaseHistoryProivider';
import HistoryRepository from '../../../../src/data/repositories/search/HistoryRepository';
import History from '@unimark/core/lib/domain/entities/search/History';
import { DEFAULT_HISTORY } from '../../../../__mocks__/constant';
import { DEFAULT_FIND_OPTIONS } from '@unimark/core/__mocks__/constant';

describe('HistoryRepository', () => {
  const repository: HistoryRepository = new HistoryRepository(
    (new mockFirebaseHistoryProvider()) as any,
  );

  beforeEach(() => {
    mockCreateHistory.mockClear();
    mockFindHistoriesBy.mockClear();
    mockUpdateHistory.mockClear();
    mockDeleteHistory.mockClear();
    mockCountHistories.mockClear();
  });


  test('createHistory', async () => {
    const _: [History, boolean] = await repository.createHistory(DEFAULT_HISTORY).toPromise();
    expect(mockCreateHistory).toHaveBeenCalledTimes(1);
    expect(mockCreateHistory).toBeCalledWith(DEFAULT_HISTORY);
  });

  test('findHistoriesBy', async () => {
    const _: History[] = await repository.findHistoriesBy(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockFindHistoriesBy).toHaveBeenCalledTimes(1);
    expect(mockFindHistoriesBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });

  test('updateHistory', async () => {
    const _: [History, boolean] = await repository.updateHistory(DEFAULT_HISTORY).toPromise();
    expect(mockUpdateHistory).toHaveBeenCalledTimes(1);
    expect(mockUpdateHistory).toBeCalledWith(DEFAULT_HISTORY);
  });

  test('deleteHistory', async () => {
    const _: [History, boolean] = await repository.deleteHistory(DEFAULT_HISTORY).toPromise();
    expect(mockDeleteHistory).toHaveBeenCalledTimes(1);
    expect(mockDeleteHistory).toBeCalledWith(DEFAULT_HISTORY);
  });

  test('countHistories', async () => {
    const _: number= await repository.countHistories(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockCountHistories).toHaveBeenCalledTimes(1);
    expect(mockCountHistories).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });
});
