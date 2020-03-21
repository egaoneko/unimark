import { AxiosInstance } from 'axios';
import {
  auth,
  db
} from './externals/firebase';
import FirebaseUserProvider from './data/providers/account/FirebaseUserProvider';

interface ProviderDependencies {
  user: FirebaseUserProvider;
}

export default class FirebaseContext {
  public providers: ProviderDependencies;

  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.providers = {
      user: new FirebaseUserProvider(db, auth),
    };
  }
}