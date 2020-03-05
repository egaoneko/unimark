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
    // firebase.auth().signOut();
    // Router.push('/sign-in');
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
  selectedKey: string;
  user?: any | null;
}

const HeaderNav: React.FC<PropsType> = ({ selectedKey, user }) => {
  const [visible, setVisible] = useState<boolean>(false);

  function onClickAvatar(user?: any | null) {
    setVisible(true);
  }

  return (
    <Header>
      <Logo
        width={200}
        height={38}
        style={{
          margin: '2px 10px 2px 0',
          float: 'left',
        }}/>
      <RightMenuContainer>
        <Dropdown
          overlay={DropdownMenu}
          trigger={['click']}
          visible={!!user && visible}
          placement="bottomRight">
          <Avatar
            onClick={onClickAvatar}
            user={user}/>
        </Dropdown>
      </RightMenuContainer>
    </Header>
  );
};

export default HeaderNav;
