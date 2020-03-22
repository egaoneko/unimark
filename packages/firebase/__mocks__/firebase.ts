import { DEFAULT_USER } from './account/constant';
import { DEFAULT_TOKEN } from './constant';

const MOCK_USER: any = {
  uid: DEFAULT_USER.id,
  email: DEFAULT_USER.email,
  displayName: DEFAULT_USER.name,
  photoURL: DEFAULT_USER.photo,
  getIdToken: jest.fn().mockImplementation((): Promise<string | undefined> => {
    return Promise.resolve(DEFAULT_TOKEN);
  })
};

export const auth: any = {
  currentUser: null,
  signIn: () => {
    auth.currentUser = MOCK_USER
  },
  signOut: () => {
    auth.currentUser = null
  },
  clear: () => {
    auth.currentUser = null
  }
};

export const db: any = {
  collection: null,
  setCollection: (collection: any) => {
    db.collection = collection
  },
  clear: () => {
    db?.collection.clear();
    db.collection = null;
  }
};