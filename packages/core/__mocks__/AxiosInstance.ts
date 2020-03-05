import { AxiosRequestConfig } from 'axios';

const mockAxiosInstance = jest.fn().mockImplementation((config: AxiosRequestConfig) => {
  return new Promise((resolve => {
    setTimeout(() => {
      resolve({ data: { message: 'success' } });
    }, 200)
  }));
});

export default mockAxiosInstance;