import GoogleSearchProvider from '../../../../src/data/providers/search/GoogleSearchProvider';
import { DEFAULT_TEST_AXIOS_INSTANCE } from '../../../../__mocks__/constant';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import Result from '@unimark/core/lib/domain/entities/search/Result';

describe('GoogleSearchProvider', () => {
  const provider: GoogleSearchProvider = new GoogleSearchProvider(DEFAULT_TEST_AXIOS_INSTANCE);

  beforeEach(() => {
  });

  test('searchQuery', async () => {
    const query: Query = new Query();
    query.word = 'google';
    query.engine = SearchEngine.GOOGLE;
    const result: Result = await provider.searchQuery(query).toPromise();
    expect(result.link).toBe(`https://www.google.com/search?q=${query.word}`);
  });
});
