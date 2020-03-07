import React from 'react';
import SEO from '../organisms/SEO';
import HeaderLayoutTemplate from '../templates/layout/HeaderLayoutTemplate';
import HomeContainer from '../templates/main/HomeContainer';

const IndexPage: React.FC = () => {
  return (
    <HeaderLayoutTemplate>
      <SEO title="Home" />
      <HomeContainer/>
    </HeaderLayoutTemplate>
  );
};

export default IndexPage;
