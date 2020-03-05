import {
  Observable,
  SchedulerLike,
} from 'rxjs';
import {
  subscribeOn,
  observeOn,
  first
} from 'rxjs/operators';
import ApplicationErrorFactory from '../../data/errors/ApplicationErrorFactory';
import ErrorType from '../../error/ErrorType';

export default abstract class UseCase<T> {
  protected abstract build(): Observable<T>;

  public run(
    executorScheduler: SchedulerLike,
    postExecutionScheduler: SchedulerLike
  ): Observable<T> {
    if (!this.validate()) {
      throw ApplicationErrorFactory.getError(ErrorType.GENERAL, 'Invalid params in UseCase');
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
      throw ApplicationErrorFactory.getError(ErrorType.GENERAL, 'Invalid params in UseCase');
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
