import React from 'react';
import {
  Result
} from 'antd';
import SEO from '../organisms/common/SEO';
import FullLayout from '../templates/layout/FullLayoutTemplate';

const NotFoundPage: React.FC = () => {
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
