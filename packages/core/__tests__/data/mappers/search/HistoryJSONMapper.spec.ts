import History, { HistoryInterface } from '../../../../src/domain/entities/search/History';
import HistoryJSONMapper from '../../../../src/data/mappers/search/HistoryJSONMapper';
import {
  DEFAULT_HISTORY,
  DEFAULT_HISTORY_JSON
} from '../../../../__mocks__/search/constant';

describe('HistoryJSONMapper', () => {
  const mapper: HistoryJSONMapper = new HistoryJSONMapper();
  const json: HistoryInterface = DEFAULT_HISTORY_JSON;
  const entity: History = DEFAULT_HISTORY;

  test('toEntity', () => {
    expect(mapper.toEntity(json).equal(entity)).toBeTruthy();
  });

  test('toEntity with wrong json', () => {
    expect(() => mapper.toEntity({} as any)).toThrowError('Invalid json');
  });

  test('toJSON', () => {
    expect(mapper.toJSON(entity)).toEqual(json);
  });
});
