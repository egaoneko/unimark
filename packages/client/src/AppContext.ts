import FirebaseUserProvider from './data/providers/account/FirebaseUserProvider';
import UserRepository from './data/repositories/account/UserRepository';
import GetCurrentUser from '@unimark/core/lib/domain/use-cases/account/GetCurrentUser';
import GetCurrentUserToken from '@unimark/core/lib/domain/use-cases/account/GetCurrentUserToken';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';
import { AxiosInstance } from 'axios';

interface ProviderDependencies {
  firebaseUser: FirebaseUserProvider;
}

interface RepositoryDependencies {
  user: UserRepository;
}

interface UseCaseDependencies {
  createUser: CreateUser;
  getCurrentUser: GetCurrentUser;
  getCurrentUserToken: GetCurrentUserToken;
}

export default class AppContext {
  private axiosInstance: AxiosInstance;
  private providers: ProviderDependencies;
  private repositories: RepositoryDependencies;
  useCases: UseCaseDependencies;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.providers = {
      firebaseUser: new FirebaseUserProvider(),
    };
    this.repositories = {
      user: new UserRepository(this.providers.firebaseUser),
    };
    this.useCases = {
      createUser: new CreateUser(this.repositories.user),
      getCurrentUser: new GetCurrentUser(this.repositories.user),
      getCurrentUserToken: new GetCurrentUserToken(this.repositories.user),
    };
  }
}