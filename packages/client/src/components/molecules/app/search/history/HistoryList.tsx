import React from 'react';
import { List } from 'antd';
import styled from 'styled-components';
import History from '@unimark/core/lib/domain/entities/search/History';
import HistoryItem from './HistoryItem';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';

const Wrapper = styled.div`
  position: absolute;
  left: 100px;
  right: 46px;
  margin-top: 6px;
  box-sizing: border-box;
  padding: 4px 0;
  overflow: hidden;
  font-size: 14px;
  font-variant: initial;
  background-color: #fff;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
  
  &.hide {
    visibility: hidden;
    height: 0;
  }
`;

const Container = styled.div`
  max-height: 256px;
  overflow-y: auto;
  box-sizing: border-box;
`;

interface PropsType {
  histories: History[];
  onSearch?: (word: string, engine: SearchEngine) => Promise<void>;
}

const HistoryList: React.FC<PropsType> = ({ histories, onSearch }) => {
  return (
    <Wrapper className={[
      'animate__animated animate__fadeIn animate__delay-0.1s',
      histories.length > 0 ? 'show' : 'hide'
    ].join(' ')}>
      <Container>
        <List
          itemLayout="horizontal"
          dataSource={histories}
          renderItem={(history: History) => (
            <HistoryItem history={history} onSearch={onSearch}/>
          )}
        />
      </Container>
    </Wrapper>
  );
};

export default HistoryList;
