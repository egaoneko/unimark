import React from 'react';
import BaseLayout from './BaseLayout';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body, #___gatsby {
    height: 100%;
  }
  div[role="group"][tabindex] {
    height: 100%;
  }
`;

interface PropsType {
  children?: React.ReactNode;
}

const FullLayout: (props: PropsType) => JSX.Element = ({ children }: PropsType): JSX.Element => {
  return (
    <BaseLayout>
      <GlobalStyles />
      {children}
    </BaseLayout>
  );
};

export default FullLayout;
