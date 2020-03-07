import React, {
  useState
} from 'react';
import {
  Dropdown,
  Menu
} from 'antd';
import Logo from '../../molecules/layout/Logo';
import Avatar from '../../molecules/layout/Avartar';
import styled from 'styled-components';
import User from '@unimark/core/lib/domain/entities/account/User';
import { signIn } from '../../../utils/router';
import firebase from '../../../externals/firebase';
import useStores from '../../../utils/mobx';
import { observer } from 'mobx-react';

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 37px;
  padding: 10px 20px;
  z-index: 100;
`;

const RightMenuContainer = styled.div`
  margin: 0 0 0 auto;
  order: 2;
`;

const DropdownMenu = () => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.KeyboardEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    firebase.auth().signOut();
    signIn();
  };
  return (
    <Menu>
      <Menu.Item>
        <a href="/#" onClick={onClick} onKeyDown={onClick}>
          Sign Out
        </a>
      </Menu.Item>
    </Menu>
  );
};

interface PropsType {
}

const HeaderNav: React.FC<PropsType> = observer(() => {
  const { userStore } = useStores();

  function onChangeVisible(visible: boolean) {
    if (!visible) {
      return;
    }

    if (userStore?.user) {
      return;
    }

    signIn();
  }

  return (
    <Header>
      <Logo
        size={38}
        style={{
          margin: '2px 10px 2px 0',
          float: 'left',
        }}/>
      <RightMenuContainer>
        <Dropdown
          overlay={DropdownMenu}
          trigger={['click']}
          onVisibleChange={onChangeVisible}
          placement="bottomRight">
          <Avatar
            user={userStore.user}/>
        </Dropdown>
      </RightMenuContainer>
    </Header>
  );
});

export default HeaderNav;
