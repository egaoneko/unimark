import { SearchEngine } from '../../src/enums/search/engine';
import Query from '../../src/domain/entities/search/Query';
import Result from '../../src/domain/entities/search/Result';


export const DEFAULT_WORD: string = 'uni';
export const DEFAULT_ENGINE: SearchEngine = SearchEngine.GOOGLE;

export const DEFAULT_QUERY: Query = new Query();
DEFAULT_QUERY.word = DEFAULT_WORD;
DEFAULT_QUERY.engine = DEFAULT_ENGINE;

export const DEFAULT_LINK: string = 'http://example.com?q=test';
export const DEFAULT_CONTENT: string = 'Hello <b>world</b>!';

export const DEFAULT_RESULT: Result = new Result();
DEFAULT_RESULT.link = DEFAULT_LINK;
DEFAULT_RESULT.content = [DEFAULT_CONTENT];