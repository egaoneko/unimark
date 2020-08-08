import React, {
  FC,
  ReactNode
} from 'react';
import CenterContainer from '../../organisms/layout/CenterContainer';

interface PropsType {
  children?: ReactNode;
}

const CenterTemplate: FC<PropsType> = ({ children }) => {
  return (
    <CenterContainer>
      {children}
    </CenterContainer>
  );
};

export default CenterTemplate;
