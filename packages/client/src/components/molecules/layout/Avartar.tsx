import React, {
  FC,
  forwardRef,
  MouseEvent,
  KeyboardEvent
} from 'react';
import { Avatar as AntAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface PropsType {
  user?: any | null;
  onClick?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
}

const Avatar: FC<PropsType> = forwardRef<any, PropsType>((props, ref) => {
  const { user, onClick }: PropsType = props;
  return (
    <Container role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      <AntAvatar ref={ref} icon={<UserOutlined/>} src={user && (user.photo || '')}/>
    </Container>
  );
});

export default Avatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  cursor: pointer;
`;
