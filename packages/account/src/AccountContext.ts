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
import SettingRepository from './data/repositories/account/SettingRepository';
import CreateSetting from '@unimark/core/lib/domain/use-cases/account/CreateSetting';
import FindSettingsBy from '@unimark/core/lib/domain/use-cases/account/FindSettingsBy';
import UpdateSetting from '@unimark/core/lib/domain/use-cases/account/UpdateSetting';
import DeleteSetting from '@unimark/core/lib/domain/use-cases/account/DeleteSetting';
import CountSettings from '@unimark/core/lib/domain/use-cases/account/CountSettings';
import AppRepository from './data/repositories/account/AppRepository';
import CreateApp from '@unimark/core/lib/domain/use-cases/account/CreateApp';
import FindAppsBy from '@unimark/core/lib/domain/use-cases/account/FindAppsBy';
import UpdateApp from '@unimark/core/lib/domain/use-cases/account/UpdateApp';
import DeleteApp from '@unimark/core/lib/domain/use-cases/account/DeleteApp';
import CountApps from '@unimark/core/lib/domain/use-cases/account/CountApps';

interface ProviderDependencies {
}

interface ContextDependencies {
  firebase: FirebaseContext;
}

interface RepositoryDependencies {
  user: UserRepository;
  setting: SettingRepository;
  app: AppRepository;
}

interface UseCaseDependencies {
  getCurrentUser: GetCurrentUser;
  getCurrentUserToken: GetCurrentUserToken;
  createUser: CreateUser;
  findUsersBy: FindUsersBy;
  updateUser: UpdateUser;
  deleteUser: DeleteUser;
  countUsers: CountUsers;
  createSetting: CreateSetting;
  findSettingsBy: FindSettingsBy;
  updateSetting: UpdateSetting;
  deleteSetting: DeleteSetting;
  countSettings: CountSettings;
  createApp: CreateApp;
  findAppsBy: FindAppsBy;
  updateApp: UpdateApp;
  deleteApp: DeleteApp;
  countApps: CountApps;
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
      user: new UserRepository(this.contexts.firebase.providers.account.user),
      setting: new SettingRepository(this.contexts.firebase.providers.account.setting),
      app: new AppRepository(this.contexts.firebase.providers.account.app),
    };
    this.useCases = {
      getCurrentUser: new GetCurrentUser(this.repositories.user),
      getCurrentUserToken: new GetCurrentUserToken(this.repositories.user),
      createUser: new CreateUser(this.repositories.user),
      findUsersBy: new FindUsersBy(this.repositories.user),
      updateUser: new UpdateUser(this.repositories.user),
      deleteUser: new DeleteUser(this.repositories.user),
      countUsers: new CountUsers(this.repositories.user),
      createSetting: new CreateSetting(this.repositories.setting),
      findSettingsBy: new FindSettingsBy(this.repositories.setting),
      updateSetting: new UpdateSetting(this.repositories.setting),
      deleteSetting: new DeleteSetting(this.repositories.setting),
      countSettings: new CountSettings(this.repositories.setting),
      createApp: new CreateApp(this.repositories.app),
      findAppsBy: new FindAppsBy(this.repositories.app),
      updateApp: new UpdateApp(this.repositories.app),
      deleteApp: new DeleteApp(this.repositories.app),
      countApps: new CountApps(this.repositories.app),
    };

  }
}
