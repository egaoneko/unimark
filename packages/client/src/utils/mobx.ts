import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import UserStore from '../stores/UserStore';
import SearchStore from '../stores/SearchStore';

export interface StoresInterface {
  userStore: UserStore;
  searchStore: SearchStore;
}

export const STORES = {
  userStore: new UserStore(),
  searchStore: new SearchStore(),
};

function useStores(): StoresInterface {
  return useContext(MobXProviderContext) as StoresInterface;
}

export default useStores;
