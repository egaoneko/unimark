import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import UserStore from '../stores/UserStore';

export interface Stores {
  userStore: UserStore;
}

function useStores(): Stores {
  return useContext(MobXProviderContext) as Stores;
}

export default useStores;