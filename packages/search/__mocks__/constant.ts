import axios, { AxiosInstance } from 'axios';
import Result from '@unimark/core/lib/domain/entities/search/Result';

export const DEFAULT_TEST_AXIOS_INSTANCE: AxiosInstance = axios.create();
export const DEFAULT_RESULT: Result = new Result();