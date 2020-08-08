import React, { FC } from 'react';
import { Spin as AntSpin } from 'antd';
import styled from 'styled-components';

interface PropsType {
}

const Loading: FC<PropsType> = () => {
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

const Spin = styled(AntSpin)`
  position: absolute;
  left: calc(50% - 18px);
  top: calc(50% - 18px);
`;
