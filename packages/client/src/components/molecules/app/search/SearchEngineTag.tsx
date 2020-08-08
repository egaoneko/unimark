import React, { FC } from 'react';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import { Tag } from 'antd';
import {
  SEARCH_ENGINE_METADATA,
  UNKNOWN_SEARCH_ENGINE_METADATA
} from '../../../../constant/search';

interface PropsType {
  engine: SearchEngine
}

const SearchEngineTag: FC<PropsType> = ({ engine }) => {
  const metadata = SEARCH_ENGINE_METADATA.get(engine);

  return (
    <Tag
      color={metadata?.color}
    >
      {metadata?.name || UNKNOWN_SEARCH_ENGINE_METADATA.name}
    </Tag>
  );
};

export default SearchEngineTag;
