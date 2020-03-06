import AppContext from '../src/AppContext';
import FirebaseUserProvider from '../src/data/providers/account/FirebaseUserProvider';
import UserRepository from '../src/data/repositories/account/UserRepository';
import GetCurrentUser from '@unimark/core/lib/domain/use-cases/account/GetCurrentUser';
import GetCurrentUserToken from '@unimark/core/lib/domain/use-cases/account/GetCurrentUserToken';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';

describe('AppContext', () => {
  const axiosInstance: any = {};
  const application: AppContext = new AppContext(axiosInstance);

  test('User', () => {
    expect((application as any).providers.firebaseUser).toBeInstanceOf(FirebaseUserProvider);
    expect((application as any).repositories.user).toBeInstanceOf(UserRepository);
    expect((application as any).useCases.createUser).toBeInstanceOf(CreateUser);
    expect((application as any).useCases.getCurrentUser).toBeInstanceOf(GetCurrentUser);
    expect((application as any).useCases.getCurrentUserToken).toBeInstanceOf(GetCurrentUserToken);
  });
});
