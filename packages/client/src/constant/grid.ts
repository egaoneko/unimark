import { Layouts } from '@unimark/core/lib/interfaces/account/setting';
import { AppType } from '@unimark/core/lib/enums/account/app';

export const DEFAULT_WEB_MAIN_LAYOUTS: Layouts = {
  lg: [
    {
      i: AppType.SEARCH,
      x: 2,
      y: 1,
      w: 9,
      h: 6,
      static: false
    }
  ],
  md: [
    {
      i: AppType.SEARCH,
      x: 1,
      y: 1,
      w: 8,
      h: 5,
      static: false
    }
  ]
};
