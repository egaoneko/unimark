import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockAppRepository, {
  mockUpdateApp,
} from '../../../../__mocks__/account/AppRepository';
import UpdateApp from '../../../../src/domain/use-cases/account/UpdateApp';
import App from '../../../../src/domain/entities/account/App';
import { DEFAULT_APP } from '../../../../__mocks__/account/constant';

describe('UpdateApp UseCase', () => {
  beforeEach(() => {
    mockAppRepository.mockClear();
    mockUpdateApp.mockClear();
  });

  test('UpdateApp is called', async() => {
    const repository = new mockAppRepository();
    const useCase: UpdateApp = new UpdateApp(repository);

    const result: [App, boolean] = await apply(useCase, (it: UpdateApp) => it.app = DEFAULT_APP)
      .runOnce(async, queue)
      .toPromise();
    expect(mockUpdateApp).toHaveBeenCalledTimes(1);
    expect(mockUpdateApp).toBeCalledWith(DEFAULT_APP);
  });

  test('throw exception without entity', () => {
    const repository = new mockAppRepository();
    const useCase: UpdateApp = new UpdateApp(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockAppRepository();
    const useCase: UpdateApp = new UpdateApp(repository);
    const app: App = DEFAULT_APP.clone();
    app.id = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid user', () => {
    const repository = new mockAppRepository();
    const useCase: UpdateApp = new UpdateApp(repository);
    const app: App = DEFAULT_APP.clone();
    app.user = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid user id', () => {
    const repository = new mockAppRepository();
    const useCase: UpdateApp = new UpdateApp(repository);
    const app: App = DEFAULT_APP.clone();
    app.user.id = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid type', () => {
    const repository = new mockAppRepository();
    const useCase: UpdateApp = new UpdateApp(repository);
    const app: App = DEFAULT_APP.clone();
    app.type = null as any;

    expect(() => {
      apply(useCase, ((it: UpdateApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
