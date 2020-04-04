import SearchRepository from '../../../../src/data/repositories/search/SearchRepository';
import mockGoogleSearchProvider, { mockSearchQuery as mockGoogleSearchQuery } from '../../../../__mocks__/GoogleSearchProivider';
import mockNaverSearchProvider, { mockSearchQuery as mockNaverSearchQuery } from '../../../../__mocks__/NaverSearchProivider';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import { DEFAULT_RESULT } from '../../../../__mocks__/constant';

describe('SearchRepository', () => {
  const repository: SearchRepository = new SearchRepository(
    (new mockGoogleSearchProvider()) as any,
    (new mockNaverSearchProvider()) as any,
  );

  beforeEach(() => {
    mockGoogleSearchQuery.mockClear();
    mockNaverSearchQuery.mockClear();
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
});
