import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockUserRepository, {
  mockDeleteUser,
} from '../../../../__mocks__/account/UserRepository';
import DeleteUser from '../../../../src/domain/use-cases/account/DeleteUser';
import User from '../../../../src/domain/entities/account/User';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('DeleteUser UseCase', () => {
  beforeEach(() => {
    mockUserRepository.mockClear();
    mockDeleteUser.mockClear();
  });

  test('DeleteUser is called', async() => {
    const repository = new mockUserRepository();
    const useCase: DeleteUser = new DeleteUser(repository);

    const result: [User, boolean] = await apply(useCase, (it: DeleteUser) => it.user = DEFAULT_USER)
      .runOnce(async, queue)
      .toPromise();
    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockDeleteUser).toBeCalledWith(DEFAULT_USER);
  });

  test('throw exception without entity', () => {
    const repository = new mockUserRepository();
    const useCase: DeleteUser = new DeleteUser(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockUserRepository();
    const useCase: DeleteUser = new DeleteUser(repository);
    const user: User = new User();
    user.id = null as any;

    expect(() => {
      apply(useCase, ((it: DeleteUser) => it.user = user))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
