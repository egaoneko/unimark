import React, { CSSProperties } from 'react';
import FullLayout from '../../organisms/layout/FullLayout';
import HeaderNav from '../../organisms/layout/HeaderNav';
import FullContent from '../../organisms/layout/FullContent';

interface PropsType {
  style?: CSSProperties;
  children?: React.ReactNode;
}

const HeaderLayoutTemplate: React.FC<PropsType> = ({ style, children }) => {
  return (
    <FullLayout style={style}>
      <HeaderNav/>
      <FullContent>
        {children}
      </FullContent>
    </FullLayout>
  );
};

export default HeaderLayoutTemplate;