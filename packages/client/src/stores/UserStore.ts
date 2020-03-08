import {
  action,
  observable
} from 'mobx';
import User from '@unimark/core/lib/domain/entities/account/User';
import Storage from '../utils/Storage';
import UserJSONMapper from '@unimark/core/lib/data/mappers/account/UserJSONMapper';
import { UserInterface } from '@unimark/core/lib/domain/entities/account/User';

const mapper = new UserJSONMapper();

export default class UserStore {
  public static KEY: string = 'user';

  @observable
  public user: User | null = null;

  public async hydrate() {
    const json = await Storage.get<UserInterface>(UserStore.KEY);
    this.user = json && mapper.toEntity(json);
  }

  @action
  public async updateUser(user: User | null): Promise<void> {
    if (user && this.user?.equal(user)) {
      return;
    }

    this.user = user;
    await Storage.set<UserInterface>(UserStore.KEY, user && mapper.toJSON(user));
  }
}
