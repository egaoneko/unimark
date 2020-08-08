import React, { FC } from 'react';
import { List } from 'antd';
import History from '@unimark/core/lib/domain/entities/search/History';
import styled from 'styled-components';
import { DRACULA_THEME_COLOR } from '../../../../../constant/theme/dracula';
import SearchEngineTag from '../SearchEngineTag';
import moment from 'moment';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';

interface PropsType {
  history: History;
  onSearch?: (word: string, engine: SearchEngine) => Promise<void>;
}

const HistoryItem: FC<PropsType> = ({ history, onSearch }) => {
  return (
    <Item
      onClick={() => onSearch && onSearch(history.word, history.engine)}
    >
      <List.Item.Meta
        title={(
          <Title>
            <SearchEngineTag engine={history.engine}/>
            {history.word}
            <Date>
              {moment(history.updatedAt).format('YY.MM.DD HH:mm')}
            </Date>
          </Title>
        )}
      />
    </Item>
  );
};

export default HistoryItem;

const Item = styled(List.Item)`
  cursor: pointer;
  padding: 8px;
  &:hover {
    .ant-list-item-meta-title {
      color: ${DRACULA_THEME_COLOR.FOREGROUND};
    }
    background: ${DRACULA_THEME_COLOR.SELECTION};
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.span`
  margin: 0 0 0 auto;
  order: 2;
`;
