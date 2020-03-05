import React, { useEffect } from 'react';
import {
  Col,
  Layout,
  Row
} from 'antd';
import FullLayoutTemplate from '../layout/FullLayoutTemplate';
import styled from 'styled-components';
import firebase from 'gatsby-plugin-firebase';

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
  background: #fff;
`;

interface PropsType {
}

const HomeContainer: React.FC<PropsType> = () => {
  return (
    <FullLayoutTemplate>
      <Container>
        <Content>
          <Row>
            <Col span={24}>
            </Col>
          </Row>
        </Content>
      </Container>
    </FullLayoutTemplate>
  );
};

export default HomeContainer;