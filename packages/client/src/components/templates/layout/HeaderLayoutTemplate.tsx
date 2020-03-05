import React from 'react';
import FullLayout from '../../organisms/layout/FullLayout';
import HeaderNav from '../../organisms/layout/HeaderNav';
import FullContent from '../../organisms/layout/FullContent';

interface PropsType {
  children?: React.ReactNode;
  user?: any | null;
}

const HeaderLayoutTemplate: React.FC<PropsType> = ({ children, user }) => {
  return (
    <FullLayout>
      <HeaderNav
        selectedKey={'stocker'}
        user={user}/>
      <FullContent>
        {children}
      </FullContent>
    </FullLayout>
  );
};

export default HeaderLayoutTemplate;