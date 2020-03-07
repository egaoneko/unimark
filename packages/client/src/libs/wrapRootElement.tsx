import React from 'react';
import { Provider } from 'mobx-react';
import {
  WrapRootElementBrowserArgs,
  WrapRootElementNodeArgs
} from 'gatsby';
import User from '@unimark/core/lib/domain/entities/account/User';
import { apply } from '@unimark/core/lib/utils/common';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import UserStore from '../stores/UserStore';
import firebase from '../externals/firebase';
import FirebaseUserMapper from '../data/mappers/account/FirebaseUserMapper';
import { CONTEXT } from '../constant';
import { NOOP } from '../utils/common';

const userStore: UserStore = new UserStore();

export default ({ element }: WrapRootElementBrowserArgs | WrapRootElementNodeArgs) => {
  initObserve();
  return <Provider userStore={userStore}>{element}</Provider>;
};

function initObserve(): void {
  firebase.auth().onAuthStateChanged((fbUser: firebase.User | null) => {
    let user: User | null = null;

    if (fbUser) {
      user = new FirebaseUserMapper().toEntity(fbUser);

      apply<CreateUser>(
        CONTEXT.useCases.createUser,
        (it: CreateUser) => it.user = user
      )
        .run(async, queue)
        .subscribe(NOOP);
    }

    userStore.updateUser(user);
  });
}