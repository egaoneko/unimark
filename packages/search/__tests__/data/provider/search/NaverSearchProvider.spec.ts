import { DEFAULT_TEST_AXIOS_INSTANCE } from '../../../../__mocks__/constant';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import NaverSearchProvider from '../../../../src/data/providers/search/NaverSearchProvider';

describe('NaverSearchProvider', () => {
  const provider: NaverSearchProvider = new NaverSearchProvider(DEFAULT_TEST_AXIOS_INSTANCE);

  beforeEach(() => {
  });

  test('searchQuery', async () => {
    const query: Query = new Query();
    query.word = 'naver';
    query.engine = SearchEngine.NAVER;
    const result: Result = await provider.searchQuery(query).toPromise();
    expect(result.link).toBe(`https://search.naver.com/search.naver?query=${query.word}`);
  });
});
