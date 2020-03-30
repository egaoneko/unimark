import { AxiosInstance } from 'axios';
import {
  auth,
  db
} from './externals/firebase';
import FirebaseUserProvider from './data/providers/account/FirebaseUserProvider';
import FirebaseSettingProvider from './data/providers/account/FirebaseSettingProvider';

interface ProviderDependencies {
  user: FirebaseUserProvider;
  setting: FirebaseSettingProvider;
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
    };
  }
}