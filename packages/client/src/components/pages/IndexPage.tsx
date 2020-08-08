import React, { FC } from 'react';
import SEO from '../organisms/common/SEO';
import HeaderLayoutTemplate from '../templates/layout/HeaderLayoutTemplate';
import HomeContainer from '../templates/main/HomeContainer';

interface PropsType {
}

const IndexPage: FC<PropsType> = () => {
  return (
    <HeaderLayoutTemplate>
      <SEO title="Home"/>
      <HomeContainer/>
    </HeaderLayoutTemplate>
  );
};

export default IndexPage;
