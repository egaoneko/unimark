import React from 'react';
import { Spin as AntSpin } from 'antd';
import styled from 'styled-components';

const Spin = styled(AntSpin)`
  position: absolute;
  left: calc(50% - 18px);
  top: calc(50% - 18px);
`;

const Loading: React.FC = () => {
  return (
    <div className="animated delay-1s fadeIn" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#CCC',
      zIndex: 1
    }}>
      <Spin/>
    </div>
  );
};

export default Loading;
