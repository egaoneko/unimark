import AccountContext from '../src/AccountContext';
import GetCurrentUser from '@unimark/core/lib/domain/use-cases/account/GetCurrentUser';
import GetCurrentUserToken from '@unimark/core/lib/domain/use-cases/account/GetCurrentUserToken';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';
import FindUsersBy from '@unimark/core/lib/domain/use-cases/account/FindUsersBy';
import UpdateUser from '@unimark/core/lib/domain/use-cases/account/UpdateUser';
import DeleteUser from '@unimark/core/lib/domain/use-cases/account/DeleteUser';
import CountUsers from '@unimark/core/lib/domain/use-cases/account/CountUsers';
import FirebaseContext from '@unimark/firebase/lib/FirebaseContext';
import UserRepository from '../src/data/repositories/account/UserRepository';
import SettingRepository from '../src/data/repositories/account/SettingRepository';
import CreateSetting from '@unimark/core/lib/domain/use-cases/account/CreateSetting';
import FindSettingsBy from '@unimark/core/lib/domain/use-cases/account/FindSettingsBy';
import DeleteSetting from '@unimark/core/lib/domain/use-cases/account/DeleteSetting';
import UpdateSetting from '@unimark/core/lib/domain/use-cases/account/UpdateSetting';
import CountSettings from '@unimark/core/lib/domain/use-cases/account/CountSettings';

describe('AccountContext', () => {
  const axiosInstance: any = {};
  const application: AccountContext = new AccountContext(axiosInstance);

  test('firebase', () => {
    expect((application as any).contexts.firebase).toBeInstanceOf(FirebaseContext);
  });

  test('user', () => {
    expect((application as any).repositories.user).toBeInstanceOf(UserRepository);
    expect((application as any).useCases.getCurrentUser).toBeInstanceOf(GetCurrentUser);
    expect((application as any).useCases.getCurrentUserToken).toBeInstanceOf(GetCurrentUserToken);
    expect((application as any).useCases.createUser).toBeInstanceOf(CreateUser);
    expect((application as any).useCases.findUsersBy).toBeInstanceOf(FindUsersBy);
    expect((application as any).useCases.updateUser).toBeInstanceOf(UpdateUser);
    expect((application as any).useCases.deleteUser).toBeInstanceOf(DeleteUser);
    expect((application as any).useCases.countUsers).toBeInstanceOf(CountUsers);
  });

  test('setting', () => {
    expect((application as any).repositories.setting).toBeInstanceOf(SettingRepository);
    expect((application as any).useCases.createSetting).toBeInstanceOf(CreateSetting);
    expect((application as any).useCases.findSettingsBy).toBeInstanceOf(FindSettingsBy);
    expect((application as any).useCases.updateSetting).toBeInstanceOf(UpdateSetting);
    expect((application as any).useCases.deleteSetting).toBeInstanceOf(DeleteSetting);
    expect((application as any).useCases.countSettings).toBeInstanceOf(CountSettings);
  });
});
