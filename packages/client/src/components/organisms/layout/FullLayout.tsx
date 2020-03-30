import React, { CSSProperties } from 'react';
import BaseLayout from './BaseLayout';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }
  div[role="group"][tabindex] {
    height: 100%;
  }
`;

interface PropsType {
  style?: CSSProperties;
  children?: React.ReactNode;
}

const FullLayout: React.FC<PropsType> = ({ style, children }) => {
  return (
    <BaseLayout style={style}>
      <GlobalStyles/>
      {children}
    </BaseLayout>
  );
};

export default FullLayout;
