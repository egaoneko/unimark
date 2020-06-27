import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import History from '@unimark/core/lib/domain/entities/search/History';
import { HistoryInterface } from '@unimark/core/lib/domain/entities/search/History';
import { DEFAULT_UUID } from '../constant';
import {
  DEFAULT_USER,
  DEFAULT_USER_JSON
} from '../account/constant';
import { FirestoreHistory } from '../../src/interfaces/search/history';


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

export const DEFAULT_CREATED_AT: number = Date.now();
export const DEFAULT_UPDATED_AT: number = Date.now();

export const DEFAULT_HISTORY: History = new History();
DEFAULT_HISTORY.id = DEFAULT_UUID;
DEFAULT_HISTORY.user = DEFAULT_USER;
DEFAULT_HISTORY.word = DEFAULT_WORD;
DEFAULT_HISTORY.engine = DEFAULT_ENGINE;
DEFAULT_HISTORY.link = DEFAULT_LINK;
DEFAULT_HISTORY.createdAt = DEFAULT_CREATED_AT;
DEFAULT_HISTORY.updatedAt = DEFAULT_UPDATED_AT;

export const DEFAULT_HISTORY_JSON: HistoryInterface = {
  id: DEFAULT_UUID,
  user: DEFAULT_USER_JSON,
  word: DEFAULT_WORD,
  engine: DEFAULT_ENGINE,
  link: DEFAULT_LINK,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const DEFAULT_HISTORY_FIRESTORE: FirestoreHistory = {
  userId: DEFAULT_USER.id,
  word: DEFAULT_WORD,
  engine: DEFAULT_ENGINE,
  link: DEFAULT_LINK,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};
