import { ERRORS } from './errors';
import ErrorFactory from '../../error/ErrorFactory';
import CustomError, { ErrorDataType } from '../../error/CustomError';
import ErrorType from '../../error/ErrorType';

export class ApplicationErrorFactory implements ErrorFactory {
  public getError(name: ErrorType, message: string, data?: ErrorDataType): CustomError {
    const error: CustomError = ERRORS[name as keyof typeof ERRORS] || ERRORS['general'];
    const params: ErrorDataType = data || {};

    error.initialize(message, params);
    return error;
  }
}

export default new ApplicationErrorFactory();