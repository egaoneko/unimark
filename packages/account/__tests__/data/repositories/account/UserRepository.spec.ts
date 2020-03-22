import mockFirebaseUserProvider, {
  mockGetCurrentUser,
  setCurrentUser,
  mockGetCurrentUserToken,
  setCurrentUserToken,
  mockCreateUser,
  mockFindUsersBy,
  mockUpdateUser,
  mockDeleteUser,
  mockCountUsers
} from '../../../../__mocks__/account/FirebaseUserProivider';
import UserRepository from '../../../../src/data/repositories/account/UserRepository';
import User from '@unimark/core/lib/domain/entities/account/User';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';
import { DEFAULT_FIND_OPTIONS } from '@unimark/core/__mocks__/constant';

describe('UserRepository', () => {
  const repository: UserRepository = new UserRepository(
    (new mockFirebaseUserProvider()) as any,
  );

  beforeEach(() => {
    mockGetCurrentUser.mockClear();
    mockGetCurrentUserToken.mockClear();
    mockCreateUser.mockClear();
    mockFindUsersBy.mockClear();
    mockUpdateUser.mockClear();
    mockDeleteUser.mockClear();
    mockCountUsers.mockClear();
  });

  test('getCurrentUser', async () => {
    setCurrentUser(DEFAULT_USER);

    const user: User | null = await repository.getCurrentUser().toPromise();

    if (!user) {
      throw 'Invalid User';
    }

    expect(mockGetCurrentUser).toHaveBeenCalledTimes(1);
    expect(user.id).toEqual(DEFAULT_USER.id);
    expect(user.email).toEqual(DEFAULT_USER.email);
    expect(user.name).toEqual(DEFAULT_USER.name);
    expect(user.role).toEqual(DEFAULT_USER.role);
  });

  test('getCurrentUser with empty', async () => {
    setCurrentUser(null);
    const user: User | null = await repository.getCurrentUser().toPromise();
    expect(mockGetCurrentUser).toHaveBeenCalledTimes(1);
    expect(user).toBeNull();
  });

  test('getCurrentUserToken', async () => {
    setCurrentUserToken('1234');
    const token: string | null = await repository.getCurrentUserToken().toPromise();
    expect(mockGetCurrentUserToken).toHaveBeenCalledTimes(1);
    expect(token).toEqual('1234');
  });

  test('getCurrentUserToken with empty', async () => {
    setCurrentUserToken(null);
    const token: string | null = await repository.getCurrentUserToken().toPromise();
    expect(mockGetCurrentUserToken).toHaveBeenCalledTimes(1);
    expect(token).toBeNull();
  });

  test('createUser', async () => {
    const _: [User, boolean] = await repository.createUser(DEFAULT_USER).toPromise();
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toBeCalledWith(DEFAULT_USER);
  });

  test('findUsersBy', async () => {
    const _: User[] = await repository.findUsersBy(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockFindUsersBy).toHaveBeenCalledTimes(1);
    expect(mockFindUsersBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });

  test('updateUser', async () => {
    const _: [User, boolean] = await repository.updateUser(DEFAULT_USER).toPromise();
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(mockUpdateUser).toBeCalledWith(DEFAULT_USER);
  });

  test('deleteUser', async () => {
    const _: [User, boolean] = await repository.deleteUser(DEFAULT_USER).toPromise();
    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockDeleteUser).toBeCalledWith(DEFAULT_USER);
  });

  test('countUsers', async () => {
    const _: number= await repository.countUsers(DEFAULT_FIND_OPTIONS).toPromise();
    expect(mockCountUsers).toHaveBeenCalledTimes(1);
    expect(mockCountUsers).toBeCalledWith(DEFAULT_FIND_OPTIONS);
  });
});
