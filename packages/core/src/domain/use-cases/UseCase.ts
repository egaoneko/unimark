import {
  Observable,
  SchedulerLike,
} from 'rxjs';
import {
  subscribeOn,
  observeOn,
  first
} from 'rxjs/operators';
import ErrorType from '../../error/ErrorType';
import { APPLICATION_ERROR_FACTORY } from '../../data/errors/factories';

export default abstract class UseCase<T> {
  protected abstract build(): Observable<T>;

  public run(
    executorScheduler: SchedulerLike,
    postExecutionScheduler: SchedulerLike
  ): Observable<T> {
    if (!this.validate()) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid params in UseCase');
    }

    return this.build()
      .pipe(
        subscribeOn(executorScheduler),
        observeOn(postExecutionScheduler)
      );
  }

  public runOnce(
    executorScheduler: SchedulerLike,
    postExecutionScheduler: SchedulerLike
  ): Observable<T> {
    if (!this.validate()) {
      throw APPLICATION_ERROR_FACTORY.getError(ErrorType.GENERAL, 'Invalid params in UseCase');
    }

    return this.build()
      .pipe(
        subscribeOn(executorScheduler),
        observeOn(postExecutionScheduler),
        first()
      );
  }

  protected validate(): boolean {
    return true;
  }
}
