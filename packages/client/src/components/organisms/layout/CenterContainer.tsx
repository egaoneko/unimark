import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface PropsType {
  children?: React.ReactNode;
}

const CenterContainer: React.FC<PropsType> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default CenterContainer;