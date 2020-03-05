import React from 'react';
import {
  Layout as AntLayout,
} from 'antd';
import styled from 'styled-components';

const Layout = styled(AntLayout)`
  height: 100%;
  background: #ffffff;
`;

interface PropsType {
  children?: React.ReactNode;
}

const BaseLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default BaseLayout;