import { AxiosInstance } from 'axios';
import GetCurrentUser from '@unimark/core/lib/domain/use-cases/account/GetCurrentUser';
import GetCurrentUserToken from '@unimark/core/lib/domain/use-cases/account/GetCurrentUserToken';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';
import FindUsersBy from '@unimark/core/lib/domain/use-cases/account/FindUsersBy';
import UpdateUser from '@unimark/core/lib/domain/use-cases/account/UpdateUser';
import DeleteUser from '@unimark/core/lib/domain/use-cases/account/DeleteUser';
import CountUsers from '@unimark/core/lib/domain/use-cases/account/CountUsers';
import FirebaseContext from '@unimark/firebase/lib/FirebaseContext';
import UserRepository from './data/repositories/account/UserRepository';

interface ProviderDependencies {
}

interface ContextDependencies {
  firebase: FirebaseContext;
}

interface RepositoryDependencies {
  user: UserRepository;
}

interface UseCaseDependencies {
  getCurrentUser: GetCurrentUser;
  getCurrentUserToken: GetCurrentUserToken;
  createUser: CreateUser;
  findUsersBy: FindUsersBy;
  updateUser: UpdateUser;
  deleteUser: DeleteUser;
  countUsers: CountUsers;
}

export default class AccountContext {
  public useCases: UseCaseDependencies;

  private axiosInstance: AxiosInstance;
  private providers: ProviderDependencies;
  private contexts: ContextDependencies;
  private repositories: RepositoryDependencies;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.providers = {
    };
    this.contexts = {
      firebase: new FirebaseContext(axiosInstance),
    };
    this.repositories = {
      user: new UserRepository(this.contexts.firebase.providers.user),
    };
    this.useCases = {
      getCurrentUser: new GetCurrentUser(this.repositories.user),
      getCurrentUserToken: new GetCurrentUserToken(this.repositories.user),
      createUser: new CreateUser(this.repositories.user),
      findUsersBy: new FindUsersBy(this.repositories.user),
      updateUser: new UpdateUser(this.repositories.user),
      deleteUser: new DeleteUser(this.repositories.user),
      countUsers: new CountUsers(this.repositories.user),
    };

  }
}