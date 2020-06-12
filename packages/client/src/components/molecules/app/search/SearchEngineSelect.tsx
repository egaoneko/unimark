import React from 'react';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import { Select } from 'antd';

const { Option } = Select;

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
      <Option value={SearchEngine.GOOGLE}>Google</Option>
      <Option value={SearchEngine.NAVER}>Naver</Option>
    </Select>
  );
};

export default SearchEngineSelect;
