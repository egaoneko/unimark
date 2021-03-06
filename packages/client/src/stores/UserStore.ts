import {
  action,
  observable
} from 'mobx';
import User, { UserInterface } from '@unimark/core/lib/domain/entities/account/User';
import History from '@unimark/core/lib/domain/entities/search/History';
import Storage from '../utils/Storage';
import UserJSONMapper from '@unimark/core/lib/data/mappers/account/UserJSONMapper';
import Setting, { SettingInterface } from '@unimark/core/lib/domain/entities/account/Setting';
import App, { AppInterface } from '@unimark/core/lib/domain/entities/account/App';
import { apply } from '@unimark/core/lib/utils/common';
import FindSettingsBy from '@unimark/core/lib/domain/use-cases/account/FindSettingsBy';
import { CONTEXT } from '../constant/context';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { Platform } from '@unimark/core/lib/enums/account/setting';
import { getDefaultLayouts } from '../utils/setting';
import CreateSetting from '@unimark/core/lib/domain/use-cases/account/CreateSetting';
import SettingJSONMapper from '@unimark/core/lib/data/mappers/account/SettingJSONMapper';
import AppJSONMapper from '@unimark/core/lib/data/mappers/account/AppJSONMapper';
import firebase from '@unimark/firebase/lib/externals/firebase';
import {
  getCurrentUser,
  onAuthStateChanged,
  signOut
} from '@unimark/firebase/lib/utils/auth';
import FirebaseUserMapper from '@unimark/firebase/lib/data/mappers/account/FirebaseUserMapper';
import { Layouts } from '@unimark/core/lib/interfaces/account/setting';
import UpdateSetting from '@unimark/core/lib/domain/use-cases/account/UpdateSetting';
import { appFactory } from '../utils/app';
import { AppType } from '@unimark/core/lib/enums/account/app';
import { DEFAULT_SEARCH_APP } from '../constant/app';
import CreateApp from '@unimark/core/lib/domain/use-cases/account/CreateApp';
import FindAppsBy from '@unimark/core/lib/domain/use-cases/account/FindAppsBy';
import { avoid } from '../decorator/ssr';
import FindHistoriesBy from '@unimark/core/lib/domain/use-cases/search/FindHistoriesBy';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';

const userMapper = new UserJSONMapper();
const settingMapper = new SettingJSONMapper();
const appMapper = new AppJSONMapper();

export default class UserStore {
  private static USER_KEY: string = 'unimark_user';
  private static SETTING_KEY: string = 'unimark_setting';
  private static APPS_KEY: string = 'unimark_apps';

  @observable
  public user: User | null = null;

  @observable
  public setting: Setting | null = null;

  @observable
  public apps: App[] = [];

  @observable
  public appMap: Map<string, App> = new Map();

  @observable
  public isLayoutEditable: boolean = false;

  private unsubscribe: firebase.Unsubscribe | null = null;

  constructor() {
    this.clear();
    // this.hydrate();
  }

  public async hydrate(): Promise<void> {
    const userJson = await Storage.get<UserInterface>(UserStore.USER_KEY);
    await this.setUser(userJson && userMapper.toEntity(userJson));

    const appsJson = await Storage.get<AppInterface[]>(UserStore.APPS_KEY);
    await this.setApps(appsJson && appsJson.map(json => appMapper.toEntity(json)) || []);

    const settingJson = await Storage.get<SettingInterface>(UserStore.SETTING_KEY);
    await this.setSetting(settingJson && settingMapper.toEntity(settingJson));
  }

  @avoid
  public async initObserve(): Promise<void> {
    const currentUser: firebase.User | null = getCurrentUser();
    if (currentUser) {
      const user: User = new FirebaseUserMapper().toEntity(currentUser);
      await this.updateUser(user);
    }

    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.unsubscribe = onAuthStateChanged((fbUser: firebase.User | null) => {
      let user: User | null = null;

      if (fbUser) {
        user = new FirebaseUserMapper().toEntity(fbUser);
      }

      this.updateUser(user);
    });
  }

  @action
  public async createUser(user: User): Promise<void> {
    await apply<CreateUser>(
      CONTEXT.contexts.account.useCases.createUser,
      (it: CreateUser) => it.user = user
    )
      .runOnce(async, queue)
      .toPromise();
  }

  @action
  public async updateUser(user: User | null): Promise<void> {
    if (user && this.user?.equal(user)) {
      return;
    }

    if (!user) {
      await this.clear();
      return;
    }

    try {
      await this.setUser(user);

      const apps = await this.loadApps(user);
      await this.setApps(apps);

      const setting = await this.loadSetting(user);
      await this.setSetting(setting);
    } catch (e) {
      await signOut();
      await this.clear();
      console.error(e);
      return;
    }
  }

  @action
  public async updateLayout(setting: Setting, allLayouts: Layouts): Promise<boolean> {
    allLayouts = JSON.parse(JSON.stringify(allLayouts)); // clear undefined
    setting.layouts[Platform.WEB_MAIN] = allLayouts;

    if (!setting?.user) {
      return false;
    }

    if (setting.id) {
      return (
        await apply<UpdateSetting>(
          CONTEXT.contexts.account.useCases.updateSetting,
          (it: UpdateSetting) => it.setting = setting
        )
          .runOnce(async, queue)
          .toPromise()
      )[1];
    } else {
      return (
        await apply<CreateSetting>(
          CONTEXT.contexts.account.useCases.createSetting,
          (it: CreateSetting) => it.setting = setting
        )
          .runOnce(async, queue)
          .toPromise()
      )[1];
    }
  }

  @action
  public setLayoutEditable(editable: boolean): void {
    this.isLayoutEditable = editable;
  }

  public async getSearchHistories(): Promise<History[]> {
    if (!this.user) {
      return [];
    }

    return await apply<FindHistoriesBy>(
      CONTEXT.contexts.search.useCases.findHistoriesBy,
      (it: FindHistoriesBy) => it.options = {}
    )
      .runOnce(async, queue)
      .toPromise();
  }

  private async clear(): Promise<void> {
    const searchApp = DEFAULT_SEARCH_APP;
    const setting = new Setting();
    setting.layouts = getDefaultLayouts({ searchApp });

    await this.setUser(null);
    await this.setSetting(setting);
    await this.setApps([searchApp]);
  }

  private async setUser(user: User | null): Promise<void> {
    this.user = user;

    if (user) {
      await Storage.set<UserInterface>(UserStore.USER_KEY, userMapper.toJSON(user));
    } else {
      await Storage.remove<UserInterface>(UserStore.USER_KEY);
    }
  }

  private async setApps(apps: App[]): Promise<void> {
    this.apps = apps;
    this.appMap.clear();

    if (this.apps.length > 0) {
      this.apps.forEach(app => this.appMap.set(app.id, app));
      await Storage.set<AppInterface[]>(UserStore.APPS_KEY, apps.map(app => appMapper.toJSON(app)));
    } else {
      await Storage.remove<UserInterface>(UserStore.APPS_KEY);
    }
  }

  private async setSetting(setting: Setting | null): Promise<void> {
    this.setting = setting;

    if (setting) {
      await Storage.set<SettingInterface>(UserStore.SETTING_KEY, settingMapper.toJSON(setting));
    } else {
      await Storage.remove<UserInterface>(UserStore.SETTING_KEY);
    }
  }

  private async loadApps(user: User): Promise<App[]> {
    return await apply<FindAppsBy>(
      CONTEXT.contexts.account.useCases.findAppsBy,
      (it: FindAppsBy) => it.options = {
        where: [['userId', '==', user.id]]
      }
    )
      .runOnce(async, queue)
      .toPromise();
  }

  private async loadSetting(user: User): Promise<Setting> {
    let setting: Setting;

    const settings: Setting[] = await apply<FindSettingsBy>(
      CONTEXT.contexts.account.useCases.findSettingsBy,
      (it: FindSettingsBy) => it.options = {
        where: [['userId', '==', user.id]]
      }
    )
      .runOnce(async, queue)
      .toPromise();

    setting = settings[0];

    let update = false;
    if (!setting) {
      setting = new Setting();
      setting.user = user;
    }

    if (
      !setting.layouts ||
      !setting.layouts[Platform.WEB_MAIN]
    ) {
      let [searchApp, success] = await apply<CreateApp>(
        CONTEXT.contexts.account.useCases.createApp,
        (it: CreateApp) => it.app = appFactory(AppType.SEARCH, user)
      )
        .runOnce(async, queue)
        .toPromise();

      if (success) {
        setting.layouts = getDefaultLayouts({ searchApp });
        this.setApps([searchApp]);
      }
    }

    if (update) {
      await apply<CreateSetting>(
        CONTEXT.contexts.account.useCases.createSetting,
        (it: CreateSetting) => it.setting = setting
      )
        .runOnce(async, queue)
        .toPromise();
    }

    return setting;
  }
}
