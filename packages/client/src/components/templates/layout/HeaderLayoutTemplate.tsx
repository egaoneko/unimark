import React, {
  FC,
  ReactNode,
  CSSProperties
} from 'react';
import FullLayout from '../../organisms/layout/FullLayout';
import HeaderNav from '../../organisms/layout/HeaderNav';
import styled from 'styled-components';
import FullContent from '../../organisms/layout/FullContent';

interface PropsType {
  style?: CSSProperties;
  children?: ReactNode;
}

const HeaderLayoutTemplate: FC<PropsType> = ({ style, children }) => {
  return (
    <FullLayout style={style}>
      <HeaderNav/>
      <ContentContainer>
        <FullContent>
          {children}
        </FullContent>
      </ContentContainer>
    </FullLayout>
  );
};

export default HeaderLayoutTemplate;

const ContentContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow: auto;
`;
