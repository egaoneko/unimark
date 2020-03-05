import React from 'react';
import CenterContainer from '../../organisms/layout/CenterContainer';

interface PropsType {
  children?: React.ReactNode;
}

const CenterTemplate: React.FC<PropsType> = ({ children }) => {
  return (
    <CenterContainer>
      {children}
    </CenterContainer>
  );
};

export default CenterTemplate;