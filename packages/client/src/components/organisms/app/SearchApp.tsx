import React, { useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Search from '../../molecules/app/search/Search';
import useStores from '../../../utils/mobx';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import History from '@unimark/core/lib/domain/entities/search/History';
import { redirect } from '../../../utils/router';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface PropsType {
}

const SearchApp: React.FC<PropsType> = observer((props) => {
  const { userStore, searchStore } = useStores();

  const onSearch = useCallback(async (word: string, engine: SearchEngine): Promise<void> => {
    const result = await searchStore.search(word, engine, userStore.user);

    if (!result) {
      return;
    }
    redirect(result.link);
  }, [userStore.user]);

  const loadHistories = useCallback(async (): Promise<History[]> => {
    return searchStore.getHistories(userStore.user);
  }, [userStore.user]);

  return (
    <Container>
      <Search
        onSearch={onSearch}
        loadHistories={loadHistories}
      />
    </Container>
  );
});

export default SearchApp;
