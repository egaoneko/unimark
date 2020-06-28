import React from 'react';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import { Select } from 'antd';
import {
  SEARCH_ENGINE_METADATA,
  UNKNOWN_SEARCH_ENGINE_METADATA
} from '../../../../constant/search';

const { Option } = Select;

const Options = [
  SearchEngine.GOOGLE,
  SearchEngine.NAVER,
].map(engine => {
  const metadata = SEARCH_ENGINE_METADATA.get(engine);
  return (
    <Option
      key={engine}
      value={engine}
    >
      {metadata?.name || UNKNOWN_SEARCH_ENGINE_METADATA.name}
    </Option>
  )
});

interface PropsType {
  defaultValue?: SearchEngine;
  value?: SearchEngine;
  onChange?: (engine: SearchEngine) => void;
}

const SearchEngineSelect: React.FC<PropsType> = (props) => {
  return (
    <Select
      style={{ width: 100 }}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
      className="select-before">
      {Options}
    </Select>
  );
};

export default SearchEngineSelect;
