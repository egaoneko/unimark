import React, {
  FC,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import {
  Dropdown,
  Menu
} from 'antd';
import { signIn } from '../../../utils/router';
import Avatar from '../../molecules/layout/Avartar';
import User from '@unimark/core/lib/domain/entities/account/User';
import { signOut } from '@unimark/firebase/lib/utils/auth';

interface PropsType {
  user: User | null
  children?: ReactNode;
}

const AvatarDropdown: FC<PropsType> = (props) => {
  const { user } = props;

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

export default AvatarDropdown;

const DropdownMenu = () => {
  const onClick = async (e: MouseEvent<HTMLAnchorElement> | KeyboardEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut();
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
