import React, { FC } from 'react';
import {
  Result
} from 'antd';
import SEO from '../organisms/common/SEO';
import FullLayout from '../templates/layout/FullLayoutTemplate';

interface PropsType {
}

const NotFoundPage: FC<PropsType> = () => {
  return (
    <FullLayout>
      <SEO title="404: Not found"/>
      <Result
        status="error"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </FullLayout>
  );
};

export default NotFoundPage;
