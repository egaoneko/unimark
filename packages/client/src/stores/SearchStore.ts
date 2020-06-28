import { SearchEngine } from '@unimark/core/lib/enums/search/engine';
import User from '@unimark/core/lib/domain/entities/account/User';
import Query from '@unimark/core/lib/domain/entities/search/Query';
import Result from '@unimark/core/lib/domain/entities/search/Result';
import History from '@unimark/core/lib/domain/entities/search/History';
import { apply } from '@unimark/core/lib/utils/common';
import SearchQuery from '@unimark/core/lib/domain/use-cases/search/SearchQuery';
import { CONTEXT } from '../constant/context';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import FindHistoriesBy from '@unimark/core/lib/domain/use-cases/search/FindHistoriesBy';

export default class SearchStore {

  constructor() {
  }

  public async search(word: string, engine: SearchEngine, user: User | null): Promise<Result | null> {
    if (!word) {
      return null;
    }

    const query = new Query();
    query.word = word;
    query.engine = engine;

    if (user) {
      query.user = user;
    }

    return await apply<SearchQuery>(
      CONTEXT.contexts.search.useCases.searchQuery,
      (it: SearchQuery) => it.query = query
    )
      .runOnce(async, queue)
      .toPromise();
  }

  public async getHistories(user: User | null): Promise<History[]> {
    if (!user) {
      return [];
    }

    return await apply<FindHistoriesBy>(
      CONTEXT.contexts.search.useCases.findHistoriesBy,
      (it: FindHistoriesBy) => it.options = {
        where: [
          ['userId', '==', user.id],
        ],
        sort: [
          ['updatedAt', 'desc'],
        ],
        limit: 5,
      }
    )
      .runOnce(async, queue)
      .toPromise();
  }
}
