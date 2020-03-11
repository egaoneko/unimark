import React from 'react';
import {
  Col,
  Layout,
  Row
} from 'antd';
import FullLayoutTemplate from '../layout/FullLayoutTemplate';
import styled from 'styled-components';
import MainGridContainer from './MainGridContainer';

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

interface PropsType {
}

const HomeContainer: React.FC<PropsType> = () => {
  return (
    <FullLayoutTemplate>
      <Container>
        <Content>
          <MainGridContainer/>
        </Content>
      </Container>
    </FullLayoutTemplate>
  );
};

export default HomeContainer;