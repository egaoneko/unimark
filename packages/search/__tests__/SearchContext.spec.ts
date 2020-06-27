import SearchContext from '../src/SearchContext';
import GoogleSearchProvider from '../src/data/providers/search/GoogleSearchProvider';
import NaverSearchProvider from '../src/data/providers/search/NaverSearchProvider';
import SearchRepository from '../src/data/repositories/search/SearchRepository';
import HistoryRepository from '../src/data/repositories/search/HistoryRepository';
import SearchQuery from '@unimark/core/lib/domain/use-cases/search/SearchQuery';
import CreateHistory from '@unimark/core/lib/domain/use-cases/search/CreateHistory';
import FindHistoriesBy from '@unimark/core/lib/domain/use-cases/search/FindHistoriesBy';
import UpdateHistory from '@unimark/core/lib/domain/use-cases/search/UpdateHistory';
import DeleteHistory from '@unimark/core/lib/domain/use-cases/search/DeleteHistory';
import CountHistories from '@unimark/core/lib/domain/use-cases/search/CountHistories';

describe('SearchContext', () => {
  const axiosInstance: any = {};
  const application: SearchContext = new SearchContext(axiosInstance);

  test('search', () => {
    expect((application as any).providers.google).toBeInstanceOf(GoogleSearchProvider);
    expect((application as any).providers.naver).toBeInstanceOf(NaverSearchProvider);
    expect((application as any).repositories.search).toBeInstanceOf(SearchRepository);
    expect((application as any).useCases.searchQuery).toBeInstanceOf(SearchQuery);
  });

  test('history', () => {
    expect((application as any).repositories.history).toBeInstanceOf(HistoryRepository);
    expect((application as any).useCases.createHistory).toBeInstanceOf(CreateHistory);
    expect((application as any).useCases.findHistoriesBy).toBeInstanceOf(FindHistoriesBy);
    expect((application as any).useCases.updateHistory).toBeInstanceOf(UpdateHistory);
    expect((application as any).useCases.deleteHistory).toBeInstanceOf(DeleteHistory);
    expect((application as any).useCases.countHistories).toBeInstanceOf(CountHistories);
  });
});
