import React from 'react';
import { Provider } from 'mobx-react';
import {
  WrapRootElementBrowserArgs,
  WrapRootElementNodeArgs
} from 'gatsby';
import { STORES } from '../utils/mobx';

export default ({ element }: WrapRootElementBrowserArgs | WrapRootElementNodeArgs) => {
  STORES.userStore.initObserve();
  return <Provider
    {...STORES}
  >{element}</Provider>;
};
