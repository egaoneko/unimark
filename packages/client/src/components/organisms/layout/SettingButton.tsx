import React from 'react';
import { Button } from 'antd';
import { SettingTwoTone } from '@ant-design/icons';
import useStores from '../../../utils/mobx';
import { observer } from 'mobx-react';
import { DRACULA_THEME_COLOR } from '../../../constant/theme/dracula';

interface PropsType {
  children?: React.ReactNode;
}

const SettingButton: React.FC<PropsType> = observer((props) => {
  const { userStore } = useStores();
  return (
    <Button
      onClick={() => userStore.setLayoutEditable(!userStore.isLayoutEditable)}
      shape="circle"
      icon={<SettingTwoTone twoToneColor={
        userStore.isLayoutEditable ? DRACULA_THEME_COLOR.GREEN : DRACULA_THEME_COLOR.BACKGROUND
      }/>}
    />
  );
});

export default SettingButton;
