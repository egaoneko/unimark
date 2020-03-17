import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockSettingRepository, {
  mockCountSettings,
} from '../../../../__mocks__/account/SettingRepository';
import CountSettings from '../../../../src/domain/use-cases/account/CountSettings';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('CountSettings UseCase', () => {
  beforeEach(() => {
    mockSettingRepository.mockClear();
    mockCountSettings.mockClear();
  });

  test('CountSettings is called', async() => {
    const repository = new mockSettingRepository();
    const useCase: CountSettings = new CountSettings(repository);

    const result: number = await apply(useCase, (it: CountSettings) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockCountSettings).toHaveBeenCalledTimes(1);
    expect(mockCountSettings).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(result).toBe(1);
  });
});
