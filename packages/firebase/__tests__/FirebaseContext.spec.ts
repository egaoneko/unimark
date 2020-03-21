import FirebaseContext from '../src/FirebaseContext';
import FirebaseUserProvider from '../src/data/providers/account/FirebaseUserProvider';

describe('FirebaseContext', () => {
  const axiosInstance: any = {};
  const application: FirebaseContext = new FirebaseContext(axiosInstance);

  test('User', () => {
    expect((application as any).providers.user).toBeInstanceOf(FirebaseUserProvider);
  });
});
