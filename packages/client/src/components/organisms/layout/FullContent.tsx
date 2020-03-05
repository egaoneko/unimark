import React, { ReactNode } from 'react';
import {
  Layout,
} from 'antd';

interface PropsType {
  children?: ReactNode;
}

const { Content } = Layout;
const FullContent: React.FC<PropsType> = ({ children }) => {

  return (
    <Content>
      {children}
    </Content>
  );
};

export default FullContent;
