import App from '../../../../src/domain/entities/account/App';
import { DEFAULT_UUID } from '../../../../__mocks__/constant';
import {
  DEFAULT_APP,
  DEFAULT_APP_DATA,
  DEFAULT_APP_TYPE
} from '../../../../__mocks__/account/constant';

describe('App', () => {
  test('equal', () => {
    const other: App = new App();
    other.id = DEFAULT_UUID;
    other.type = DEFAULT_APP_TYPE;
    other.data = DEFAULT_APP_DATA;
    expect(DEFAULT_APP.equal(other)).toBeTruthy();

    other.id = null as any;
    other.type = DEFAULT_APP_TYPE;
    other.data = DEFAULT_APP_DATA;
    expect(DEFAULT_APP.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.type = null as any;
    other.data = DEFAULT_APP_DATA;
    expect(DEFAULT_APP.equal(other)).toBeFalsy();

    other.id = DEFAULT_UUID;
    other.type = DEFAULT_APP_TYPE;
    other.data = null as any;
    expect(DEFAULT_APP.equal(other)).toBeFalsy();
  });

  test('clone', () => {
    const clone: App = DEFAULT_APP.clone();
    expect(clone.id).toEqual(DEFAULT_APP.id);
    expect(clone.type).toEqual(DEFAULT_APP.type);
    expect(clone.data).toEqual(DEFAULT_APP.data);
  });

  test('toString', () => {
    expect(DEFAULT_APP.toString()).toBe([
      DEFAULT_APP.id,
      DEFAULT_APP.type,
    ].join(','));
  });
});
