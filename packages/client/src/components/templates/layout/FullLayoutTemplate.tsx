import React from 'react';
import FullLayout from '../../organisms/layout/FullLayout';
import FullContent from '../../organisms/layout/FullContent';

interface PropsType {
  children?: React.ReactNode;
}

const FullLayoutTemplate: React.FC<PropsType> = ({ children }) => {
  return (
    <FullLayout>
      <FullContent>
        {children}
      </FullContent>
    </FullLayout>
  );
};

export default FullLayoutTemplate;