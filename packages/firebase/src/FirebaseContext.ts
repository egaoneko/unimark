import { AxiosInstance } from 'axios';
import {
  auth,
  db
} from './externals/firebase';
import FirebaseUserProvider from './data/providers/account/FirebaseUserProvider';
import FirebaseSettingProvider from './data/providers/account/FirebaseSettingProvider';
import FirebaseAppProvider from './data/providers/account/FirebaseAppProvider';
import FirebaseHistoryProvider from './data/providers/search/FirebaseHistoryProvider';

interface ProviderDependencies {
  account: {
    user: FirebaseUserProvider;
    setting: FirebaseSettingProvider;
    app: FirebaseAppProvider;
  };
  search: {
    history: FirebaseHistoryProvider;
  }
}

export default class FirebaseContext {
  public providers: ProviderDependencies;

  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;

    const user: FirebaseUserProvider = new FirebaseUserProvider(db, auth);
    this.providers = {
      account: {
        user,
        setting: new FirebaseSettingProvider(db, auth, user),
        app: new FirebaseAppProvider(db, auth, user),
      },
      search: {
        history: new FirebaseHistoryProvider(db, auth, user),
      }
    };
  }
}
