import React, { FC } from 'react';
import {
  Layout,
} from 'antd';
import styled from 'styled-components';
import MainGridContainer from '../grid/MainGridContainer';

interface PropsType {
}

const HomeContainer: FC<PropsType> = () => {
  return (
    <Container>
      <Content>
        <MainGridContainer/>
      </Content>
    </Container>
  );
};

export default HomeContainer;

const Container = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  background: #ffffff;
`;

const Content = styled(Layout.Content)`
  width: 100%;
  height: 100%;
  background: #fff;
`;
