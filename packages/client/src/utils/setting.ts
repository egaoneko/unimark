import { Layouts } from '@unimark/core/lib/interfaces/account/setting';
import App from '@unimark/core/lib/domain/entities/account/App';
import { AppLayouts } from '@unimark/core/lib/domain/entities/account/Setting';
import { Platform } from '@unimark/core/lib/enums/account/setting';

interface GetDefaultLayoutsParams {
  searchApp: App;
}

export function getDefaultLayouts(params: GetDefaultLayoutsParams): AppLayouts {
  const layouts: Layouts = {
    lg: [
      {
        i: params.searchApp.id,
        x: 2,
        y: 1,
        w: 9,
        h: 6,
        static: false
      }
    ],
    md: [
      {
        i: params.searchApp.id,
        x: 1,
        y: 1,
        w: 8,
        h: 5,
        static: false
      }
    ],
    sm: [
      {
        i: params.searchApp.id,
        x: 0,
        y: 1,
        w: 6,
        h: 5,
        static: false
      }
    ],
    xs: [
      {
        i: params.searchApp.id,
        x: 0,
        y: 1,
        w: 4,
        h: 5,
        static: false
      }
    ],
    xxs: [
      {
        i: params.searchApp.id,
        x: 0,
        y: 1,
        w: 2,
        h: 5,
        static: false
      }
    ]
  };

  return { [Platform.WEB_MAIN]: layouts };
}
