import AppContext from '../src/AppContext';
import UserRepository from '../src/data/repositories/account/UserRepository';
import GetCurrentUser from '@unimark/core/lib/domain/use-cases/account/GetCurrentUser';
import GetCurrentUserToken from '@unimark/core/lib/domain/use-cases/account/GetCurrentUserToken';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';
import FindUsersBy from '@unimark/core/lib/domain/use-cases/account/FindUsersBy';
import UpdateUser from '@unimark/core/lib/domain/use-cases/account/UpdateUser';
import DeleteUser from '@unimark/core/lib/domain/use-cases/account/DeleteUser';
import CountUsers from '@unimark/core/lib/domain/use-cases/account/CountUsers';

describe('AppContext', () => {
  const axiosInstance: any = {};
  const application: AppContext = new AppContext(axiosInstance);

  test('User', () => {
    expect((application as any).repositories.user).toBeInstanceOf(UserRepository);
    expect((application as any).useCases.getCurrentUser).toBeInstanceOf(GetCurrentUser);
    expect((application as any).useCases.getCurrentUserToken).toBeInstanceOf(GetCurrentUserToken);
    expect((application as any).useCases.createUser).toBeInstanceOf(CreateUser);
    expect((application as any).useCases.findUsersBy).toBeInstanceOf(FindUsersBy);
    expect((application as any).useCases.updateUser).toBeInstanceOf(UpdateUser);
    expect((application as any).useCases.deleteUser).toBeInstanceOf(DeleteUser);
    expect((application as any).useCases.countUsers).toBeInstanceOf(CountUsers);
  });
});
