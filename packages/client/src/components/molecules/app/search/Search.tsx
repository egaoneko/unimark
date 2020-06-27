import React, { useState } from 'react';
import { Input } from 'antd';
import SearchEngineSelect from './SearchEngineSelect';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import User from '@unimark/core/lib/domain/entities/account/User';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import { apply } from '@unimark/core/lib/utils/common';
import SearchQuery from '@unimark/core/lib/domain/use-cases/search/SearchQuery';
import { CONTEXT } from '../../../../constant/context';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';

async function onSearch(word: string, engine: SearchEngine, user: User | null): Promise<void> {
  if (!word) {
    return;
  }

  const query = new Query();
  query.word = word;
  query.engine = engine;

  if (user) {
    query.user = user;
  }

  const result: Result = await apply<SearchQuery>(
    CONTEXT.contexts.search.useCases.searchQuery,
    (it: SearchQuery) => it.query = query
  )
    .runOnce(async, queue)
    .toPromise();
  // redirect(result.link);
}

interface PropsType {
  user: User | null;
}

const Search: React.FC<PropsType> = (props) => {
  const [engine, setEngine] = useState<SearchEngine>(SearchEngine.GOOGLE);

  return (
    <Input.Search
      addonBefore={(
        <SearchEngineSelect
          value={engine}
          onChange={setEngine}
        />
      )}
      size="large"
      enterButton
      onSearch={value => onSearch(value, engine, props.user)}
    />
  );
};

export default Search;
