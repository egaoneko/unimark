import React from 'react';
import { Provider } from 'mobx-react';
import {
  WrapRootElementBrowserArgs,
  WrapRootElementNodeArgs
} from 'gatsby';
import User from '@unimark/core/lib/domain/entities/account/User';
import UserStore from '../stores/UserStore';
import { IS_SSR } from '../constant/common';
import FirebaseUserMapper from '@unimark/firebase/lib/data/mappers/account/FirebaseUserMapper';
import firebase from '@unimark/firebase/lib/externals/firebase';
import {
  getCurrentUser,
  onAuthStateChanged
} from '@unimark/firebase/lib/utils/auth';

const userStore: UserStore = new UserStore();

export default ({ element }: WrapRootElementBrowserArgs | WrapRootElementNodeArgs) => {
  initObserve();
  return <Provider userStore={userStore}>{element}</Provider>;
};

async function initObserve(): Promise<void> {
  if (IS_SSR) {
    return;
  }

  const currentUser: firebase.User | null = getCurrentUser();
  if (currentUser) {
    const user: User = new FirebaseUserMapper().toEntity(currentUser);
    await userStore.updateUser(user);
  }

  onAuthStateChanged((fbUser: firebase.User | null) => {
    let user: User | null = null;

    if (fbUser) {
      user = new FirebaseUserMapper().toEntity(fbUser);
    }

    userStore.updateUser(user);
  });
}