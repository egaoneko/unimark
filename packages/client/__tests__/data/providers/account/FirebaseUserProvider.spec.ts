import User from '@unimark/core/lib/domain/entities/account/User';
import FirebaseUserProvider from '../../../../src/data/providers/account/FirebaseUserProvider';
import {
  DEFAULT_USER,
  DEFAULT_USER_JSON,
} from '../../../../__mocks__/account/constant';
import { DEFAULT_TOKEN } from '../../../../__mocks__/constant';
import {
  auth,
  db
} from '../../../../__mocks__/firebase';
import {
  clear,
  reset,
  collection,
  doc,
  get,
  set,
  data,
} from '../../../../__mocks__/account/MockUserCorrection';

describe('FirebaseUserProvider', () => {

  beforeAll(() => {
    db.setCollection(collection)
  });

  afterAll(() => {
    db.clear();
    auth.clear();
  });

  afterEach(() => {
    clear();
  });

  const provider: FirebaseUserProvider = new FirebaseUserProvider(
    db,
    auth,
  );

  test('findUserById', async () => {
    const id: string = DEFAULT_USER.id;
    const user: User | null = await provider.findUserById(id).toPromise();

    if (!user) {
      throw 'Invalid User';
    }

    expect(user.id).toEqual(DEFAULT_USER.id);
    expect(user.email).toEqual(DEFAULT_USER.email);
    expect(user.name).toEqual(DEFAULT_USER.name);
    expect(user.role).toEqual(DEFAULT_USER.role);
    expect(user.photo).toEqual(DEFAULT_USER.photo);

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('users');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toBeCalledWith(id);
    expect(get).toHaveBeenCalledTimes(1);
    expect(data).toHaveBeenCalledTimes(1);
  });

  test('findUserById with invalid', async () => {
    const id: string = 'invaid';
    const user: User | null = await provider.findUserById(id).toPromise();

    expect(user).toBeNull();

    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toBeCalledWith('users');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toBeCalledWith(id);
    expect(get).toHaveBeenCalledTimes(1);
  });

  test('createUser', async () => {
    reset(true);
    const id: string = DEFAULT_USER.id;
    const [_, success]: [User, boolean] = await provider.createUser(DEFAULT_USER).toPromise();
    expect(success).toBeTruthy();

    expect(collection).toHaveBeenCalledTimes(2);
    expect(collection).toBeCalledWith('users');
    expect(doc).toHaveBeenCalledTimes(2);
    expect(doc).toBeCalledWith(id);
    expect(get).toHaveBeenCalledTimes(1);
    expect(data).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toBeCalledWith(DEFAULT_USER_JSON);
  });

  test('getCurrentUser with authorization', async () => {
    auth.signIn();
    const user: User | null = await provider.getCurrentUser().toPromise();

    if (!user) {
      throw 'Invalid User';
    }

    expect(user.id).toEqual(DEFAULT_USER.id);
    expect(user.email).toEqual(DEFAULT_USER.email);
    expect(user.name).toEqual(DEFAULT_USER.name);
    expect(user.role).toEqual(DEFAULT_USER.role);
    expect(user.photo).toEqual(DEFAULT_USER.photo);
  });

  test('getCurrentUser without authorization', async () => {
    auth.signOut();
    const user: User | null = await provider.getCurrentUser().toPromise();
    expect(user).toBeNull();
  });

  test('getCurrentUserToken with authorization', async () => {
    auth.signIn();
    const token: string | null = await provider.getCurrentUserToken().toPromise();
    expect(token).toEqual(DEFAULT_TOKEN);
  });

  test('getCurrentUserToken without authorization', async () => {
    auth.signOut();
    const token: string | null = await provider.getCurrentUserToken().toPromise();
    expect(token).toBeNull();
  });
});