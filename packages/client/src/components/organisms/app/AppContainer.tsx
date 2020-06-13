import React from 'react';
import { Layout } from '@unimark/core/lib/interfaces/account/setting';
import SearchApp from './SearchApp';
import { AppType } from '@unimark/core/lib/enums/account/app';

interface PropsType {
  layout: Layout;
}

const AppContainer: React.FC<PropsType> = ({ layout }) => {
  return (
    <>
      {factory(layout)}
    </>
  );
};

function factory(layout: Layout): React.ReactNode {
  switch (layout.i) {
    case AppType.SEARCH:
      return <SearchApp/>;
    default:
      return <></>;
  }
}

export default AppContainer;
