import React, { CSSProperties } from 'react';
import {
  Layout as AntLayout,
} from 'antd';
import styled from 'styled-components';

const Layout = styled(AntLayout)`
  height: 100%;
  background: #ffffff;
`;

interface PropsType {
  style?: CSSProperties;
  children?: React.ReactNode;
}

const BaseLayout: React.FC<PropsType> = ({ style, children }) => {
  return (
    <Layout style={{
      ...style
    }}>
      {children}
    </Layout>
  );
};

export default BaseLayout;