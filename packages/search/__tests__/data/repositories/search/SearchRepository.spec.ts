import SearchRepository from '../../../../src/data/repositories/search/SearchRepository';
import mockGoogleSearchProvider, { mockSearchQuery as mockGoogleSearchQuery } from '../../../../__mocks__/GoogleSearchProivider';
import mockNaverSearchProvider, { mockSearchQuery as mockNaverSearchQuery } from '../../../../__mocks__/NaverSearchProivider';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import {
  DEFAULT_QUERY,
  DEFAULT_RESULT
} from '../../../../__mocks__/constant';
import mockHistoryRepository, {
  mockCreateHistory,
  mockFindHistoriesBy,
  mockUpdateHistory
} from '../../../../__mocks__/HistoryRepository';

describe('SearchRepository', () => {
  const repository: SearchRepository = new SearchRepository(
    (new mockGoogleSearchProvider()) as any,
    (new mockNaverSearchProvider()) as any,
    (new mockHistoryRepository()) as any,
  );

  beforeEach(() => {
    mockGoogleSearchQuery.mockClear();
    mockNaverSearchQuery.mockClear();
    mockCreateHistory.mockClear();
    mockFindHistoriesBy.mockClear();
    mockUpdateHistory.mockClear();
  });

  test('google', async () => {
    const query: Query = new Query();
    query.engine = SearchEngine.GOOGLE;

    const result: Result = await repository.searchQuery(query).toPromise();

    expect(result).toBe(DEFAULT_RESULT);
    expect(mockGoogleSearchQuery).toBeCalledWith(query);
    expect(mockGoogleSearchQuery).toBeCalledTimes(1);
  });

  test('naver', async () => {
    const query: Query = new Query();
    query.engine = SearchEngine.NAVER;

    const result: Result = await repository.searchQuery(query).toPromise();

    expect(result).toBe(DEFAULT_RESULT);
    expect(mockNaverSearchQuery).toBeCalledWith(query);
    expect(mockNaverSearchQuery).toBeCalledTimes(1);
  });

  test('other', async () => {
    const query: Query = new Query();
    expect(() => repository.searchQuery(query).toPromise()).toThrowError('Invalid params in Query');
  });

  test('history with already searched', async () => {
    const query: Query = DEFAULT_QUERY.clone();
    await repository.searchQuery(query).toPromise();

    expect(mockGoogleSearchQuery).toBeCalledWith(query);
    expect(mockGoogleSearchQuery).toBeCalledTimes(1);

    await new Promise(r => setTimeout(r, 10));
    expect(mockFindHistoriesBy).toBeCalledTimes(1);
    expect(mockUpdateHistory).toBeCalledTimes(1);
  });

  test('history with new', async () => {
    const query: Query = DEFAULT_QUERY.clone();
    query.word = 'test';
    await repository.searchQuery(query).toPromise();

    expect(mockGoogleSearchQuery).toBeCalledWith(query);
    expect(mockGoogleSearchQuery).toBeCalledTimes(1);

    await new Promise(r => setTimeout(r, 10));
    expect(mockFindHistoriesBy).toBeCalledTimes(1);
    expect(mockCreateHistory).toBeCalledTimes(1);
  });

  test('history without user', async () => {
    const query: Query = DEFAULT_QUERY.clone();
    delete query.user;
    await repository.searchQuery(query).toPromise();

    expect(mockGoogleSearchQuery).toBeCalledWith(query);
    expect(mockGoogleSearchQuery).toBeCalledTimes(1);
    expect(mockFindHistoriesBy).toBeCalledTimes(0);
  });
});
