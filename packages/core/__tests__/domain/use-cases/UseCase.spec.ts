import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import {
  Observable,
  ReplaySubject
} from 'rxjs';
import UseCase from '../../../src/domain/use-cases/UseCase';
import { apply } from '../../../src/utils/common';

describe('UseCase', () => {
  class ImplementedUserCase extends UseCase<number> {
    public param: string = '';

    constructor(
      private repository: any
    ) {
      super();
    }

    protected build(): Observable<number> {
      return this.repository.test(this.param);
    }

    protected validate(): boolean {
      return this.param === 'valid';
    }
  }

  const mockMethod = jest.fn().mockImplementation((): Observable<number> => {
    const subject: ReplaySubject<number> = new ReplaySubject();

    let count: number = 0;
    let interval: NodeJS.Timeout = setInterval(() => {
      if (count > 2) {
        clearInterval(interval);
        subject.complete();
        return;
      }
      subject.next(count);
      count++;
    }, 100);
    return subject;
  });

  const mockRepository = jest.fn().mockImplementation(() => {
    return {
      test: mockMethod
    };
  });

  beforeEach(() => {
    mockRepository.mockClear();
    mockMethod.mockClear();
  });

  test('run', (done) => {
    const repository = new mockRepository();
    const useCase: ImplementedUserCase = new ImplementedUserCase(repository);
    let cnt: number = 0;
    apply(useCase, (it: ImplementedUserCase) => it.param = 'valid')
      .run(async, queue)
      .subscribe(
        (count: number) => {
          expect(count).toBe(cnt);
          cnt++;
        },
        () => {
        },
        () => {
          expect(mockMethod).toHaveBeenCalledTimes(1);
          expect(cnt).toBe(3);
          done();
        }
      );
  });

  test('run throw exception without invalid', () => {
    const repository = new mockRepository();
    const useCase: ImplementedUserCase = new ImplementedUserCase(repository);

    expect(() => {
      apply(useCase, (it: ImplementedUserCase) => it.param = 'invalid')
        .run(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('runOnce', (done) => {
    const repository = new mockRepository();
    const useCase: ImplementedUserCase = new ImplementedUserCase(repository);
    let cnt: number = 0;
    apply(useCase, (it: ImplementedUserCase) => it.param = 'valid')
      .runOnce(async, queue)
      .subscribe(
        (count: number) => {
          expect(count).toBe(cnt);
          cnt++;
        },
        () => {
        },
        () => {
          expect(mockMethod).toHaveBeenCalledTimes(1);
          expect(cnt).toBe(1);
          done();
        }
      );

  });

  test('runOnce throw exception without invalid', () => {
    const repository = new mockRepository();
    const useCase: ImplementedUserCase = new ImplementedUserCase(repository);

    expect(() => {
      apply(useCase, (it: ImplementedUserCase) => it.param = 'invalid')
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});