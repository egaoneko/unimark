import { AxiosInstance } from 'axios';
import {
  auth,
  db
} from './externals/firebase';
import FirebaseUserProvider from './data/providers/account/FirebaseUserProvider';
import UserRepository from './data/repositories/account/UserRepository';
import GetCurrentUser from '@unimark/core/lib/domain/use-cases/account/GetCurrentUser';
import GetCurrentUserToken from '@unimark/core/lib/domain/use-cases/account/GetCurrentUserToken';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';
import FindUsersBy from '@unimark/core/lib/domain/use-cases/account/FindUsersBy';
import UpdateUser from '@unimark/core/lib/domain/use-cases/account/UpdateUser';
import DeleteUser from '@unimark/core/lib/domain/use-cases/account/DeleteUser';
import CountUsers from '@unimark/core/lib/domain/use-cases/account/CountUsers';

interface ProviderDependencies {
  firebaseUser: FirebaseUserProvider;
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

export default class AppContext {
  private axiosInstance: AxiosInstance;
  private providers: ProviderDependencies;
  private repositories: RepositoryDependencies;
  useCases: UseCaseDependencies;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.providers = {
      firebaseUser: new FirebaseUserProvider(db, auth),
    };
    this.repositories = {
      user: new UserRepository(this.providers.firebaseUser),
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