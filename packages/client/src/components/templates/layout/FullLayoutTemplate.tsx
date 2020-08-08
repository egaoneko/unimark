import React, {
  FC,
  ReactNode,
  CSSProperties
} from 'react';
import FullLayout from '../../organisms/layout/FullLayout';
import FullContent from '../../organisms/layout/FullContent';

interface PropsType {
  style?: CSSProperties;
  children?: ReactNode;
}

const FullLayoutTemplate: FC<PropsType> = ({ style, children }) => {
  return (
    <FullLayout style={style}>
      <FullContent>
        {children}
      </FullContent>
    </FullLayout>
  );
};

export default FullLayoutTemplate;
