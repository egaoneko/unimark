import React from 'react';
import { Provider } from 'mobx-react';
import {
  WrapRootElementBrowserArgs,
  WrapRootElementNodeArgs
} from 'gatsby';
import UserStore from '../stores/UserStore';

const userStore: UserStore = new UserStore();

export default ({ element }: WrapRootElementBrowserArgs | WrapRootElementNodeArgs) => {
  userStore.initObserve();
  return <Provider userStore={userStore}>{element}</Provider>;
};
