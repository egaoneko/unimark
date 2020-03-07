import axios, { AxiosInstance } from 'axios';
import AppContext from './AppContext';

export const TIMEOUT: number = 10000;
export const DEFAULT_AXIOS_INSTANCE: AxiosInstance = axios.create({
  timeout: TIMEOUT,
});
export const CONTEXT: AppContext = new AppContext(DEFAULT_AXIOS_INSTANCE);