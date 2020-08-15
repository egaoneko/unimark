import { uuid } from '@unimark/core/lib/utils/common';
import { Options } from '@unimark/core/lib/interfaces/repository/options';
import { SERVICE } from '../src/constant/common';

export const DEFAULT_ID: string = 'ea37d172-cc7b-4c26-be53-47bd02a5e327';
export const DEFAULT_TOKEN: string = 'valid-token';
export const DEFAULT_UUID: string = uuid();
export const DEFAULT_FIND_OPTIONS: Options = {};

export const DEFAULT_COLLECTION_PATH: string = 'test';
export const DEFAULT_FULL_COLLECTION_PATH: string = `${SERVICE}-${DEFAULT_COLLECTION_PATH}`;
