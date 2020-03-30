import React, { CSSProperties } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  height: 100%;
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