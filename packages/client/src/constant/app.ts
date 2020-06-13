import { v4 as uuid } from 'uuid';
import { AppType } from '@unimark/core/lib/enums/account/app';
import { appFactory } from '../utils/app';

export const DEFAULT_SEARCH_APP = appFactory(AppType.SEARCH);
DEFAULT_SEARCH_APP.id = uuid();
