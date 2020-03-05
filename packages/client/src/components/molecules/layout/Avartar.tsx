import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
`;

interface PropsType {
  user?: any | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
}

const Avatar: React.FC<PropsType> = React.forwardRef<any, PropsType>((props, ref) => {
  const { user, onClick }: PropsType = props;
  return (
    <Container role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      <AntAvatar ref={ref} icon={<UserOutlined />} src={user && (user.photo || '')} />
    </Container>
  );
});

export default Avatar;
