import { async } from 'rxjs/internal/scheduler/async';
import mockUserRepository, {
  mockFindUserById,
  reset
} from '../../../../__mocks__/account/UserRepository';
import { queue } from 'rxjs/internal/scheduler/queue';
import User from '../../../../src/domain/entities/account/User';
import { apply } from '../../../../src/utils/common';
import FindUserById from '../../../../src/domain/use-cases/account/FindUserById';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('FindUserById UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockFindUserById.mockClear();
    reset();
  });

  test('FindUserById is called', (done) => {
    const repository = new mockUserRepository();
    const useCase: FindUserById = new FindUserById(repository);

    apply(useCase, (it: FindUserById) => it.id = DEFAULT_USER.id)
      .runOnce(async, queue)
      .subscribe((user: User | null) => {
        if (!user) {
          throw 'Can not find user';
        }

        expect(mockFindUserById).toHaveBeenCalledTimes(1);
        expect(user.id).toBe(DEFAULT_USER.id);
        done();
      });
  });

  test('FindUserById is called with unregistered user', (done) => {
    const repository = new mockUserRepository();
    const useCase: FindUserById = new FindUserById(repository);

    apply(useCase, (it: FindUserById) => it.id = '0')
      .runOnce(async, queue)
      .subscribe((user: User | null) => {
        expect(mockFindUserById).toHaveBeenCalledTimes(1);
        expect(user).toBeNull();
        done();
      });
  });

  test('throw exception without id', () => {
    const repository = new mockUserRepository();
    const useCase: FindUserById = new FindUserById(repository);

    expect(() => {
      apply(useCase, () => {
      })
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
