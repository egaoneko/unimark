import React from 'react';
import {
  Dropdown,
  Menu
} from 'antd';
import Logo from '../../molecules/layout/Logo';
import Avatar from '../../molecules/layout/Avartar';
import styled from 'styled-components';
import { signIn } from '../../../utils/router';
import { auth } from '../../../externals/firebase';
import useStores from '../../../utils/mobx';
import { observer } from 'mobx-react';
import User from '@unimark/core/lib/src/domain/entities/account/User';

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
    auth.signOut();
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

const AvatarDropdown: React.FC<{ user: User }> = ({ user }) => {
  function onClickAvatar() {
    signIn();
  }

  if (!user) {
    return <Avatar onClick={onClickAvatar} user={user}/>;
  }

  return (
    <Dropdown
      overlay={DropdownMenu}
      trigger={['click']}
      placement="bottomRight">
      <Avatar
        user={user}/>
    </Dropdown>
  );
};

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
        <AvatarDropdown user={userStore.user}/>
      </RightMenuContainer>
    </Header>
  );
});

export default HeaderNav;
