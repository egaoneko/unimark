import React from 'react';
import { Layout } from '@unimark/core/lib/interfaces/account/setting';
import SearchApp from './SearchApp';
import { App } from '@unimark/core/lib/enums/account/setting';

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
    case App.SEARCH:
      return <SearchApp/>;
    default:
      return <></>;
  }
}

export default AppContainer;
