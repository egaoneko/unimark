import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockAppRepository, {
  mockCreateApp,
} from '../../../../__mocks__/account/AppRepository';
import CreateApp from '../../../../src/domain/use-cases/account/CreateApp';
import App from '../../../../src/domain/entities/account/App';
import { DEFAULT_APP } from '../../../../__mocks__/account/constant';

describe('CreateApp UseCase', () => {
  beforeEach(() => {
    mockAppRepository.mockClear();
    mockCreateApp.mockClear();
  });

  test('CreateApp is called', async() => {
    const repository = new mockAppRepository();
    const useCase: CreateApp = new CreateApp(repository);

    const result: [App, boolean] = await apply(useCase, (it: CreateApp) => it.app = DEFAULT_APP)
      .runOnce(async, queue)
      .toPromise();
    expect(mockCreateApp).toHaveBeenCalledTimes(1);
    expect(mockCreateApp).toBeCalledWith(DEFAULT_APP);
  });

  test('throw exception without entity', () => {
    const repository = new mockAppRepository();
    const useCase: CreateApp = new CreateApp(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockAppRepository();
    const useCase: CreateApp = new CreateApp(repository);
    const app: App = new App();
    app.id = null as any;

    expect(() => {
      apply(useCase, ((it: CreateApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid userId', () => {
    const repository = new mockAppRepository();
    const useCase: CreateApp = new CreateApp(repository);
    const app: App = new App();
    app.userId = null as any;

    expect(() => {
      apply(useCase, ((it: CreateApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid type', () => {
    const repository = new mockAppRepository();
    const useCase: CreateApp = new CreateApp(repository);
    const app: App = new App();
    app.type = null as any;

    expect(() => {
      apply(useCase, ((it: CreateApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
