import { AxiosInstance } from 'axios';
import AccountContext from '@unimark/account/lib/AccountContext';
import SearchContext from '@unimark/search/lib/SearchContext';

interface ProviderDependencies {
}

interface ContextDependencies {
  account: AccountContext;
  search: SearchContext;
}

interface RepositoryDependencies {
}

interface UseCaseDependencies {
}

export default class AppContext {
  public contexts: ContextDependencies;
  public useCases: UseCaseDependencies;

  private axiosInstance: AxiosInstance;
  private providers: ProviderDependencies;
  private repositories: RepositoryDependencies;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.providers = {};
    this.contexts = {
      account: new AccountContext(axiosInstance),
      search: new SearchContext(axiosInstance),
    };
    this.repositories = {};
    this.useCases = {};
  }
}
