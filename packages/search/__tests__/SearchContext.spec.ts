import SearchContext from '../src/SearchContext';
import GoogleSearchProvider from '../src/data/providers/search/GoogleSearchProvider';
import NaverSearchProvider from '../src/data/providers/search/NaverSearchProvider';
import SearchRepository from '../src/data/repositories/search/SearchRepository';
import SearchQuery from '@unimark/core/lib/domain/use-cases/search/SearchQuery';

describe('SearchContext', () => {
  const axiosInstance: any = {};
  const application: SearchContext = new SearchContext(axiosInstance);

  test('search', () => {
    expect((application as any).providers.google).toBeInstanceOf(GoogleSearchProvider);
    expect((application as any).providers.naver).toBeInstanceOf(NaverSearchProvider);
    expect((application as any).repositories.search).toBeInstanceOf(SearchRepository);
    expect((application as any).useCases.searchQuery).toBeInstanceOf(SearchQuery);
  });
});
