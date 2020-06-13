import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockAppRepository, {
  mockDeleteApp,
} from '../../../../__mocks__/account/AppRepository';
import DeleteApp from '../../../../src/domain/use-cases/account/DeleteApp';
import App from '../../../../src/domain/entities/account/App';
import { DEFAULT_APP } from '../../../../__mocks__/account/constant';

describe('DeleteApp UseCase', () => {
  beforeEach(() => {
    mockAppRepository.mockClear();
    mockDeleteApp.mockClear();
  });

  test('DeleteApp is called', async() => {
    const repository = new mockAppRepository();
    const useCase: DeleteApp = new DeleteApp(repository);

    const result: [App, boolean] = await apply(useCase, (it: DeleteApp) => it.app = DEFAULT_APP)
      .runOnce(async, queue)
      .toPromise();
    expect(mockDeleteApp).toHaveBeenCalledTimes(1);
    expect(mockDeleteApp).toBeCalledWith(DEFAULT_APP);
  });

  test('throw exception without entity', () => {
    const repository = new mockAppRepository();
    const useCase: DeleteApp = new DeleteApp(repository);

    expect(() => {
      apply(useCase, () => {})
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockAppRepository();
    const useCase: DeleteApp = new DeleteApp(repository);
    const app: App = new App();
    app.id = null as any;

    expect(() => {
      apply(useCase, ((it: DeleteApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockAppRepository();
    const useCase: DeleteApp = new DeleteApp(repository);
    const app: App = new App();
    app.user = null as any;

    expect(() => {
      apply(useCase, ((it: DeleteApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });

  test('throw exception with invalid id', () => {
    const repository = new mockAppRepository();
    const useCase: DeleteApp = new DeleteApp(repository);
    const app: App = new App();
    app.type = null as any;

    expect(() => {
      apply(useCase, ((it: DeleteApp) => it.app = app))
        .runOnce(async, queue)
    }).toThrowError('Invalid params in UseCase');
  });
});
