import FirebaseContext from '../src/FirebaseContext';
import FirebaseUserProvider from '../src/data/providers/account/FirebaseUserProvider';
import FirebaseSettingProvider from '../src/data/providers/account/FirebaseSettingProvider';

describe('FirebaseContext', () => {
  const axiosInstance: any = {};
  const application: FirebaseContext = new FirebaseContext(axiosInstance);

  test('user', () => {
    expect((application as any).providers.user).toBeInstanceOf(FirebaseUserProvider);
  });

  test('setting', () => {
    expect((application as any).providers.setting).toBeInstanceOf(FirebaseSettingProvider);
  });
});
