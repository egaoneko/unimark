import { AxiosInstance } from 'axios';
import {
  auth,
  db
} from './externals/firebase';
import FirebaseUserProvider from './data/providers/account/FirebaseUserProvider';
import FirebaseSettingProvider from './data/providers/account/FirebaseSettingProvider';
import FirebaseAppProvider from './data/providers/account/FirebaseAppProvider';

interface ProviderDependencies {
  user: FirebaseUserProvider;
  setting: FirebaseSettingProvider;
  app: FirebaseAppProvider;
}

export default class FirebaseContext {
  public providers: ProviderDependencies;

  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;

    const user: FirebaseUserProvider = new FirebaseUserProvider(db, auth);
    this.providers = {
      user,
      setting: new FirebaseSettingProvider(db, auth, user),
      app: new FirebaseAppProvider(db, auth, user),
    };
  }
}
