import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockAppRepository, {
  mockCountApps,
} from '../../../../__mocks__/account/AppRepository';
import CountApps from '../../../../src/domain/use-cases/account/CountApps';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('CountApps UseCase', () => {
  beforeEach(() => {
    mockAppRepository.mockClear();
    mockCountApps.mockClear();
  });

  test('CountApps is called', async() => {
    const repository = new mockAppRepository();
    const useCase: CountApps = new CountApps(repository);

    const result: number = await apply(useCase, (it: CountApps) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockCountApps).toHaveBeenCalledTimes(1);
    expect(mockCountApps).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(result).toBe(1);
  });
});
