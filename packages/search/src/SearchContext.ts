import { AxiosInstance } from 'axios';
import GoogleSearchProvider from './data/providers/search/GoogleSearchProvider';
import NaverSearchProvider from './data/providers/search/NaverSearchProvider';
import SearchRepository from './data/repositories/search/SearchRepository';
import HistoryRepository from './data/repositories/search/HistoryRepository';
import SearchQuery from '@unimark/core/lib/domain/use-cases/search/SearchQuery';
import FirebaseContext from '@unimark/firebase/lib/FirebaseContext';
import CreateHistory from '@unimark/core/lib/domain/use-cases/search/CreateHistory';
import FindHistoriesBy from '@unimark/core/lib/domain/use-cases/search/FindHistoriesBy';
import UpdateHistory from '@unimark/core/lib/domain/use-cases/search/UpdateHistory';
import DeleteHistory from '@unimark/core/lib/domain/use-cases/search/DeleteHistory';
import CountHistories from '@unimark/core/lib/domain/use-cases/search/CountHistories';

interface ProviderDependencies {
  google: GoogleSearchProvider;
  naver: NaverSearchProvider;
}

interface ContextDependencies {
  firebase: FirebaseContext;
}

interface RepositoryDependencies {
  search: SearchRepository;
  history: HistoryRepository;
}

interface UseCaseDependencies {
  searchQuery: SearchQuery;
  createHistory: CreateHistory;
  findHistoriesBy: FindHistoriesBy;
  updateHistory: UpdateHistory;
  deleteHistory: DeleteHistory;
  countHistories: CountHistories;
}

export default class SearchContext {
  public useCases: UseCaseDependencies;

  private axiosInstance: AxiosInstance;
  private providers: ProviderDependencies;
  private contexts: ContextDependencies;
  private repositories: RepositoryDependencies;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.providers = {
      google: new GoogleSearchProvider(axiosInstance),
      naver: new NaverSearchProvider(axiosInstance),
    };
    this.contexts = {
      firebase: new FirebaseContext(axiosInstance),
    };
    this.repositories = {
      search: new SearchRepository(
        this.providers.google,
        this.providers.naver,
      ),
      history: new HistoryRepository(this.contexts.firebase.providers.search.history),
    };
    this.useCases = {
      searchQuery: new SearchQuery(this.repositories.search),
      createHistory: new CreateHistory(this.repositories.history),
      findHistoriesBy: new FindHistoriesBy(this.repositories.history),
      updateHistory: new UpdateHistory(this.repositories.history),
      deleteHistory: new DeleteHistory(this.repositories.history),
      countHistories: new CountHistories(this.repositories.history),
    };

  }
}
