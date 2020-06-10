import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

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

const SearchApp: React.FC<PropsType> = (props) => {
  return (
    <Container>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={value => console.log(value)}
      />
    </Container>
  );
};

export default SearchApp;
