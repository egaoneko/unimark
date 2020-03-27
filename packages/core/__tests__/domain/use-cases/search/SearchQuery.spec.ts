import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockSearchRepository, {
  mockSearchQuery,
} from '../../../../__mocks__/search/SearchRepository';
import SearchQuery from '../../../../src/domain/use-cases/search/SearchQuery';
import Query from '../../../../src/domain/entities/search/Query';
import { DEFAULT_QUERY } from '../../../../__mocks__/search/constant';

describe('SearchQuery UseCase', () => {
  beforeEach(() => {
    mockSearchRepository.mockClear();
    mockSearchQuery.mockClear();
  });

  test('SearchQuery is called', async() => {
    const repository = new mockSearchRepository();
    const useCase: SearchQuery = new SearchQuery(repository);

    const query: Query = DEFAULT_QUERY.clone();
    const result: any = await apply(useCase, (it: SearchQuery) => it.query = query)
      .runOnce(async, queue)
      .toPromise();
    expect(mockSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockSearchQuery).toBeCalledWith(query)
  });

  test('throw exception without query', () => {
    const repository = new mockSearchRepository();
    const useCase: SearchQuery = new SearchQuery(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception without word', () => {
    const repository = new mockSearchRepository();
    const useCase: SearchQuery = new SearchQuery(repository);

    const query: Query = DEFAULT_QUERY.clone();
    query.word = '';
    expect(() => {
      apply(useCase, (it: SearchQuery) => it.query = query)
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception without engine', () => {
    const repository = new mockSearchRepository();
    const useCase: SearchQuery = new SearchQuery(repository);

    const query: Query = DEFAULT_QUERY.clone();
    query.engine = null as any;
    expect(() => {
      apply(useCase, (it: SearchQuery) => it.query = query)
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
