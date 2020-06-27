import FirebaseContext from '../src/FirebaseContext';
import FirebaseUserProvider from '../src/data/providers/account/FirebaseUserProvider';
import FirebaseSettingProvider from '../src/data/providers/account/FirebaseSettingProvider';
import FirebaseAppProvider from '../src/data/providers/account/FirebaseAppProvider';
import FirebaseHistoryProvider from '../src/data/providers/search/FirebaseHistoryProvider';

describe('FirebaseContext', () => {
  const axiosInstance: any = {};
  const application: FirebaseContext = new FirebaseContext(axiosInstance);

  describe('account', () => {
    test('user', () => {
      expect((application as any).providers.account.user).toBeInstanceOf(FirebaseUserProvider);
    });

    test('setting', () => {
      expect((application as any).providers.account.setting).toBeInstanceOf(FirebaseSettingProvider);
    });

    test('app', () => {
      expect((application as any).providers.account.app).toBeInstanceOf(FirebaseAppProvider);
    });
  });

  describe('search', () => {
    test('history', () => {
      expect((application as any).providers.search.history).toBeInstanceOf(FirebaseHistoryProvider);
    });
  });
});
