import {
  action,
  observable
} from 'mobx';
import User from '@unimark/core/lib/domain/entities/account/User';

export default class UserStore {
  @observable
  public user: User | null = null;

  public hydrate(serializedStore: any) {
    this.user = serializedStore['user'] != null
      ? serializedStore['user']
      : null;
  }

  @action
  public updateUser(user: User | null): void {
    this.user = user;
  }
}

export async function fetchInitialRootStoreState(): Promise<object> {
  return Promise.resolve({});
}
