import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockUserRepository, {
  mockUpdateUser,
} from '../../../../__mocks__/account/UserRepository';
import UpdateUser from '../../../../src/domain/use-cases/account/UpdateUser';
import User from '../../../../src/domain/entities/account/User';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('UpdateUser UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockUpdateUser.mockClear();
  });

  test('UpdateUser is called', async() => {
    const repository = new mockUserRepository();
    const useCase: UpdateUser = new UpdateUser(repository);

    const result: [User, boolean] = await apply(useCase, (it: UpdateUser) => it.user = DEFAULT_USER)
      .runOnce(async, queue)
      .toPromise();
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(mockUpdateUser).toBeCalledWith(DEFAULT_USER);
  });

  test('throw exception without entity', () => {
    const repository = new mockUserRepository();
    const useCase: UpdateUser = new UpdateUser(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockUserRepository();
    const useCase: UpdateUser = new UpdateUser(repository);
    const user: User = new User();
    user.id = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateUser) => it.user = user))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid email', () => {
    const repository = new mockUserRepository();
    const useCase: UpdateUser = new UpdateUser(repository);
    const user: User = new User();
    user.email = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateUser) => it.user = user))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid name', () => {
    const repository = new mockUserRepository();
    const useCase: UpdateUser = new UpdateUser(repository);
    const user: User = new User();
    user.name = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateUser) => it.user = user))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid role', () => {
    const repository = new mockUserRepository();
    const useCase: UpdateUser = new UpdateUser(repository);
    const user: User = new User();
    user.role = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateUser) => it.user = user))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
