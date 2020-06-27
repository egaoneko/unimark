import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Search from '../../molecules/app/search/Search';
import useStores from '../../../utils/mobx';

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
  const { userStore } = useStores();

  return (
    <Container>
      <Search user={userStore.user}/>
    </Container>
  );
});

export default SearchApp;
