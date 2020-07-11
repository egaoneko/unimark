import { Options } from '../src/interfaces/repository/options';
import { uuid } from '../src/utils/common';

export const DEFAULT_UUID: string = uuid();
export const DEFAULT_FIND_OPTIONS: Options = {};

export const DEFAULT_CREATED_AT: number = Date.now();
export const DEFAULT_UPDATED_AT: number = Date.now();
