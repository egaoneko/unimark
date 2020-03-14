import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { apply } from '../../../../src/utils/common';
import mockSettingRepository, {
  mockFindSettingsBy,
} from '../../../../__mocks__/account/SettingRepository';
import FindSettingsBy from '../../../../src/domain/use-cases/account/FindSettingsBy';
import Setting from '../../../../src/domain/entities/account/Setting';
import { DEFAULT_FIND_OPTIONS } from '../../../../__mocks__/constant';

describe('FindSettingsBy UseCase', () => {
  beforeEach(() => {
    mockSettingRepository.mockClear();
    mockFindSettingsBy.mockClear();
  });

  test('FindSettingsBy is called', async() => {
    const repository = new mockSettingRepository();
    const useCase: FindSettingsBy = new FindSettingsBy(repository);

    const results: Setting[] = await apply(useCase, (it: FindSettingsBy) => it.options = DEFAULT_FIND_OPTIONS)
      .runOnce(async, queue)
      .toPromise();
    expect(mockFindSettingsBy).toHaveBeenCalledTimes(1);
    expect(mockFindSettingsBy).toBeCalledWith(DEFAULT_FIND_OPTIONS);
    expect(results.length).toBe(1);
  });
});
