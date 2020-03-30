import AppContext from '../src/AppContext';
import AccountContext from '@unimark/account/lib/AccountContext';

describe('AppContext', () => {
  const axiosInstance: any = {};
  const application: AppContext = new AppContext(axiosInstance);

  test('account', () => {
    expect((application as any).contexts.account).toBeInstanceOf(AccountContext);
  });
});
