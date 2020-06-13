import React from 'react';
import { Layout } from '@unimark/core/lib/interfaces/account/setting';
import SearchApp from './SearchApp';
import { AppType } from '@unimark/core/lib/enums/account/app';
import { observer } from 'mobx-react';
import useStores from '../../../utils/mobx';
import ErrorContainer from '../../molecules/app/common/ErrorContainer';

interface PropsType {
  layout: Layout;
}

const AppContainer: React.FC<PropsType> = observer(({ layout }) => {
  const { userStore } = useStores();

  const app = userStore.appMap.get(layout.i);

  if (!app) {
    return <ErrorContainer>ERROR</ErrorContainer>;
  }

  return (
    <>
      {factory(app.type)}
    </>
  );
});

function factory(appType: AppType): React.ReactNode {
  switch (appType) {
    case AppType.SEARCH:
      return <SearchApp/>;
    default:
      return <></>;
  }
}

export default AppContainer;
