import React, {
  FC,
  ReactNode
} from 'react';
import styled from 'styled-components';
import { Result } from 'antd';

interface PropsType {
  title?: string;
  children?: ReactNode;
}

const ErrorContainer: FC<PropsType> = (props) => {
  return (
    <Container>
      <Result
        status={'warning'}
        title={props.title || 'There are some problems with loading.'}
      />
    </Container>
  );
};

export default ErrorContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f8f8f2;
  border: 2px solid #ff5555;
`;
