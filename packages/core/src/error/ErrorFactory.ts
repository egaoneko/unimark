import { Err } from './err';

import CustomError from './CustomError';

export default interface ErrorFactory {
  getError(name: string, data?: Err): CustomError;
}