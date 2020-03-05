import HttpProvider from '../../../src/data/providers/HttpProvider';
import {
  AxiosInstance,
  AxiosRequestConfig
} from 'axios';
import { Observable } from 'rxjs';
import mockAxiosInstance from '../../../__mocks__/AxiosInstance';

describe('HttpProvider', () => {
  class ImplementedHttpProvider extends HttpProvider {
    constructor(instance: AxiosInstance) {
      super(instance);
    }

    testRequest<T>(config: AxiosRequestConfig): Observable<T> {
      return this.request(config)
    }
  }

  test('request', (done) => {
    const provider: ImplementedHttpProvider = new ImplementedHttpProvider(mockAxiosInstance as any);
    const config: AxiosRequestConfig = { url: 'www.example.com' };
    const response: Observable<{ message: string }> = provider.testRequest(config);
    expect(mockAxiosInstance).toHaveBeenCalledTimes(1);
    expect(mockAxiosInstance).toBeCalledWith(config);
    response.subscribe((expected) => {
      expect(expected).toEqual({ message: 'success' });
      done();
    });
  });
});
