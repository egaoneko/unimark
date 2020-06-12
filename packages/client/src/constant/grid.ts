import { Layouts } from '@unimark/core/lib/interfaces/account/setting';
import { App } from '@unimark/core/lib/enums/account/setting';

export const DEFAULT_WEB_MAIN_LAYOUTS: Layouts = {
  lg: [
    {
      i: App.SEARCH,
      x: 2,
      y: 1,
      w: 9,
      h: 6,
      static: false
    }
  ],
  md: [
    {
      i: App.SEARCH,
      x: 1,
      y: 1,
      w: 8,
      h: 5,
      static: false
    }
  ]
};
