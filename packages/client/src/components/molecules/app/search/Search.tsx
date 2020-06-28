import React, { useState } from 'react';
import { Input } from 'antd';
import SearchEngineSelect from './SearchEngineSelect';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import History from '@unimark/core/lib/domain/entities/search/History';
import styled from 'styled-components';
import HistoryList from './history/HistoryList';

const Container = styled.div`
  position: relative;
  width: 100%;
`;


interface PropsType {
  onSearch?: (word: string, engine: SearchEngine) => Promise<void>;
  loadHistories?: () => Promise<History[]>;
}

const Search: React.FC<PropsType> = (props) => {
  const {
    onSearch,
    loadHistories,
  } = props;
  const [engine, setEngine] = useState<SearchEngine>(SearchEngine.GOOGLE);
  const [histories, setHistories] = useState<History[]>([]);
  const [timer, setTimer] = useState<number>(null);

  return (
    <Container>
      <Input.Search
        addonBefore={(
          <SearchEngineSelect
            value={engine}
            onChange={setEngine}
          />
        )}
        size="large"
        enterButton
        onSearch={value => onSearch && onSearch(value, engine)}
        onFocus={async () => loadHistories && setHistories(await loadHistories())}
        onBlur={() => {
          clearTimeout(timer);
          setTimer(
            setTimeout(() => {
              setHistories([]);
              setTimer(null);
            }, 100)
          );
        }}
      />
      <HistoryList
        histories={histories}
        onSearch={onSearch}
      />
    </Container>
  );
};

export default Search;
