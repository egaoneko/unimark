import { async } from 'rxjs/internal/scheduler/async';
import mockUserRepository, {
  mockCreateUser,
  reset
} from '../../../../__mocks__/account/UserRepository';
import { queue } from 'rxjs/internal/scheduler/queue';
import CreateUser from '../../../../src/domain/use-cases/account/CreateUser';
import User from '../../../../src/domain/entities/account/User';
import { Role } from '../../../../src/enums/account';
import { apply } from '../../../../src/utils/common';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('CreateUser UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockCreateUser.mockClear();
    reset();
  });

  test('CreateUser is called', (done) => {
    const repository = new mockUserRepository();
    const useCase: CreateUser = new CreateUser(repository);

    apply(useCase, (it: CreateUser) => it.user = DEFAULT_USER)
      .runOnce(async, queue)
      .subscribe(([user, success]: [User, boolean]) => {
        expect(mockCreateUser).toHaveBeenCalledTimes(1);
        expect(success).toBeTruthy();
        expect(user).toBe(DEFAULT_USER);
        done();
      });
  });

  test('throw exception without user', () => {
    const repository = new mockUserRepository();
    const useCase: CreateUser = new CreateUser(repository);

    expect(() => {
      apply(useCase, () => {
      })
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockUserRepository();
    const useCase: CreateUser = new CreateUser(repository);
    const user: User = new User('', 'test@test.com', 'test', Role.USER);

    expect(() => {
      apply(useCase, (it: CreateUser) => it.user = user)
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid email', () => {
    const repository = new mockUserRepository();
    const useCase: CreateUser = new CreateUser(repository);
    const user: User = new User('1234', '', 'test', Role.USER);

    expect(() => {
      apply(useCase, (it: CreateUser) => it.user = user)
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid name', () => {
    const repository = new mockUserRepository();
    const useCase: CreateUser = new CreateUser(repository);
    const user: User = new User('1234', 'test@test.com', '', Role.USER);

    expect(() => {
      apply(useCase, (it: CreateUser) => it.user = user)
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid role', () => {
    const repository = new mockUserRepository();
    const useCase: CreateUser = new CreateUser(repository);
    const user: User = new User('1234', 'test@test.com', 'test', '' as any);

    expect(() => {
      apply(useCase, (it: CreateUser) => it.user = user)
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});