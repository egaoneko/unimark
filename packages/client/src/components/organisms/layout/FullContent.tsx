import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

interface PropsType {
  children?: ReactNode;
}

const FullContent: React.FC<PropsType> = ({ children }) => {
  return (
    <Content>
      {children}
    </Content>
  );
};

export default FullContent;
