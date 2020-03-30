import { DEFAULT_USER } from './constant';
import { UserInterface } from '@unimark/core/lib/domain/entities/account/User';

const mockAxiosInstance = jest.fn().mockImplementation(({ data }: { data: UserInterface }) => {
  return new Promise((resolve => {
    setTimeout(() => {
      if (DEFAULT_USER.id === data.id) {
        resolve({
          data: {
            created: true,
          }
        });
      } else {
        resolve({
          data: {
            created: false,
          }
        });
      }
    }, 200)
  }));
});

export default mockAxiosInstance;