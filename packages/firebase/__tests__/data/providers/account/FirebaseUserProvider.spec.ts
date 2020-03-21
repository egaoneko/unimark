import User from '@unimark/core/lib/domain/entities/account/User';
import FirebaseUserProvider from '../../../../src/data/providers/account/FirebaseUserProvider';
import {
  DEFAULT_USER,
  DEFAULT_USER_FIRESTORE,
} from '../../../../__mocks__/account/constant';
import {
  DEFAULT_TOKEN
} from '../../../../__mocks__/constant';
import {
  auth,
  db
} from '../../../../__mocks__/firebase';
import { collection } from '../../../../__mocks__/MockCorrection';

describe('FirebaseUserProvider', () => {
  const provider: FirebaseUserProvider = new FirebaseUserProvider(
    db,
    auth,
  );

  const createSpyFn = jest.spyOn<any, any>(provider, 'create');
  const findBySpyFn = jest.spyOn<any, any>(provider, 'findBy');
  const updateSpyFn = jest.spyOn<any, any>(provider, 'update');
  const deleteSpyFn = jest.spyOn<any, any>(provider, 'delete');
  const countSpyFn = jest.spyOn<any, any>(provider, 'count');
  const projectSpyFn = jest.spyOn<any, any>(provider, 'project');
  const unprojectSpyFn = jest.spyOn<any, any>(provider, 'unproject');

  beforeAll(() => {
    db.setCollection(collection);
  });

  afterAll(() => {
    db.clear();
    auth.clear();
  });

  afterEach(() => {
    createSpyFn.mockClear();
    findBySpyFn.mockClear();
    updateSpyFn.mockClear();
    deleteSpyFn.mockClear();
    countSpyFn.mockClear();
    projectSpyFn.mockClear();
    unprojectSpyFn.mockClear();
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

  test('createUser', async () => {
    const _: [User, boolean] = await provider.createUser(DEFAULT_USER).toPromise();
    expect(createSpyFn).toBeCalledTimes(1);
  });

  test('findUsersBy', async () => {
    const _: User[] = await provider.findUsersBy({}).toPromise();
    expect(findBySpyFn).toBeCalledTimes(1);
  });

  test('updateUser', async () => {
    const _: [User, boolean] = await provider.updateUser(DEFAULT_USER).toPromise();
    expect(updateSpyFn).toBeCalledTimes(1);
  });

  test('deleteUser', async () => {
    const _: [User, boolean] = await provider.deleteUser(DEFAULT_USER).toPromise();
    expect(deleteSpyFn).toBeCalledTimes(1);
  });

  test('countUsers', async () => {
    const _: number = await provider.countUsers({}).toPromise();
    expect(countSpyFn).toBeCalledTimes(1);
  });

  test('project', async () => {
    expect(await (provider as any).project(DEFAULT_USER).toPromise()).toEqual(DEFAULT_USER_FIRESTORE);
  });

  test('unproject', async () => {
    expect(
      (await (provider as any).unproject({
        id: DEFAULT_USER.id,
        ...DEFAULT_USER_FIRESTORE,
      }).toPromise()).equal(DEFAULT_USER)
    ).toBeTruthy();
  });
});