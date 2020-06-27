import React from 'react';
import User from '@unimark/core/lib/domain/entities/account/User';

interface PropsType {
  user: User | null;
}

const HistoryList: React.FC<PropsType> = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

export default HistoryList;
