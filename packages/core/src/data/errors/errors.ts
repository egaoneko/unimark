import GeneralError from './GeneralError';
import CustomError from '../../error/CustomError';

export const ERRORS: { [key: string]: CustomError } = {
  general: new GeneralError(),
};