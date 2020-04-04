import { AxiosInstance } from 'axios';
import GoogleSearchProvider from './data/providers/search/GoogleSearchProvider';
import NaverSearchProvider from './data/providers/search/NaverSearchProvider';
import SearchRepository from './data/repositories/search/SearchRepository';
import SearchQuery from '@unimark/core/lib/domain/use-cases/search/SearchQuery';

interface ProviderDependencies {
  google: GoogleSearchProvider;
  naver: NaverSearchProvider;
}

interface ContextDependencies {
}

interface RepositoryDependencies {
  search: SearchRepository;
}

interface UseCaseDependencies {
  searchQuery: SearchQuery;
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
    };
    this.repositories = {
      search: new SearchRepository(
        this.providers.google,
        this.providers.naver,
      )
    };
    this.useCases = {
      searchQuery: new SearchQuery(this.repositories.search),
    };

  }
}