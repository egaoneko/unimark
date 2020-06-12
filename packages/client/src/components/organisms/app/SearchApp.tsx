import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Input,
} from 'antd';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import SearchEngineSelect from '../../molecules/app/search/SearchEngineSelect';
import { apply } from '@unimark/core/lib/utils/common';
import { CONTEXT } from '../../../constant/context';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import SearchQuery from '@unimark/core/lib/domain/use-cases/search/SearchQuery';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import { redirect } from '../../../utils/router';

const { Search } = Input;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

async function onSearch(word: string, engine: SearchEngine): void {
  if (!word) {
    return;
  }

  const query = new Query();
  query.word = word;
  query.engine = engine;

  const result: Result = await apply<SearchQuery>(
    CONTEXT.contexts.search.useCases.searchQuery,
    (it: SearchQuery) => it.query = query
  )
    .runOnce(async, queue)
    .toPromise();
  redirect(result.link);
}

interface PropsType {
}

const SearchApp: React.FC<PropsType> = (props) => {
  const [engine, setEngine] = useState<SearchEngine>(SearchEngine.GOOGLE);
  return (
    <Container>
      <Search
        addonBefore={(
          <SearchEngineSelect
            value={engine}
            onChange={setEngine}
          />
        )}
        size="large"
        enterButton
        onSearch={value => onSearch(value, engine)}
      />
    </Container>
  );
};

export default SearchApp;
