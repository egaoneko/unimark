import mockFirebaseUserProvider, {
  mockCreateUser,
  mockFindUserById,
  mockGetCurrentUser,
  setCurrentUser,
  mockGetCurrentUserToken,
  setCurrentUserToken
} from '../../../../__mocks__/account/FirebaseUserProivider';
import UserRepository from '../../../../src/data/repositories/account/UserRepository';
import User from '@unimark/core/lib/domain/entities/account/User';
import { DEFAULT_USER } from '../../../../__mocks__/account/constant';

describe('UserRepository', () => {
  const repository: UserRepository = new UserRepository(
    (new mockFirebaseUserProvider()) as any,
  );

  beforeEach(() => {
    mockFindUserById.mockClear();
    mockCreateUser.mockClear();
    mockGetCurrentUser.mockClear();
    mockGetCurrentUserToken.mockClear();
  });

  test('findUserById', async () => {
    const user: User | null = await repository.findUserById(DEFAULT_USER.id).toPromise();
    expect(mockFindUserById).toHaveBeenCalledTimes(1);
    expect(mockFindUserById).toBeCalledWith(DEFAULT_USER.id);
    if (user) {
      expect(user.id).toBe(DEFAULT_USER.id);
      expect(user.email).toBe(DEFAULT_USER.email);
      expect(user.name).toBe(DEFAULT_USER.name);
      expect(user.role).toBe(DEFAULT_USER.role);
      expect(user.photo).toBe(DEFAULT_USER.photo);
    } else {
      expect(user).toBeNull();
    }
  });

  test('createUser', async () => {
    const [user, success]: [User, boolean] = await repository.createUser(DEFAULT_USER).toPromise();
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toBeCalledWith(DEFAULT_USER);
    expect(success).toBeTruthy();
    expect(user.id).toBe(DEFAULT_USER.id);
    expect(user.email).toBe(DEFAULT_USER.email);
    expect(user.name).toBe(DEFAULT_USER.name);
    expect(user.role).toBe(DEFAULT_USER.role);
    expect(user.photo).toBe(DEFAULT_USER.photo);
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
});
