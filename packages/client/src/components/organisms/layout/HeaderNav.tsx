import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Logo from '../../molecules/layout/Logo';
import useStores from '../../../utils/mobx';
import AvatarDropdown from './AvatarDropdown';
import SettingButton from './SettingButton';
import { DRACULA_THEME_COLOR } from '../../../constant/theme/dracula';

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 37px;
  padding: 10px 20px;
  z-index: 100;
  background: ${DRACULA_THEME_COLOR.BACKGROUND};
  * {
    user-select: none;
  }
`;

const RightMenuContainer = styled.div`
  margin: 0 0 0 auto;
  order: 2;
  display: flex;
  align-items: center;
  
  div {
    margin-left: 8px;
  }
`;

interface PropsType {
}

const HeaderNav: React.FC<PropsType> = observer(() => {
  const { userStore } = useStores();

  return (
    <Header>
      <Logo
        size={38}
        style={{
          margin: '2px 10px 2px 0',
          float: 'left',
        }}/>
      <RightMenuContainer>
        { userStore.user && <SettingButton/> }
        <AvatarDropdown user={userStore.user}/>
      </RightMenuContainer>
    </Header>
  );
});

export default HeaderNav;
