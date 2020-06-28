import { SearchEngineMetadata } from '../interfaces/search';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';

export const SEARCH_ENGINE_METADATA: Map<SearchEngine, SearchEngineMetadata> = new Map();

SEARCH_ENGINE_METADATA.set(SearchEngine.GOOGLE, {
  name: 'Google',
  type: SearchEngine.GOOGLE,
  color: 'red',
});

SEARCH_ENGINE_METADATA.set(SearchEngine.NAVER, {
  name: 'Naver',
  type: SearchEngine.NAVER,
  color: 'green',
});

export const UNKNOWN_SEARCH_ENGINE_METADATA = {
  name: 'Unknown',
  type: '',
  color: '',
};
