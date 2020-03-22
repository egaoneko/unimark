import React, {
  useEffect,
  useState
} from 'react';
import {
  Responsive,
  WidthProvider
} from 'react-grid-layout';
import './grid.css';
import { DEFAULT_WEB_MAIN_LAYOUTS } from '../../../constant/grid';
import {
  Layout,
  Layouts
} from '@unimark/core/lib/interfaces/account/setting';
import { CONTEXT } from '../../../constant/context';
import {
  apply,
} from '@unimark/core/lib/utils/common';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import FindSettingsBy from '@unimark/core/lib/domain/use-cases/account/FindSettingsBy';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import CreateSetting from '@unimark/core/lib/domain/use-cases/account/CreateSetting';
import useStores from '../../../utils/mobx';
import { App } from '@unimark/core/lib/enums/account/setting';
import User from '@unimark/core/lib/domain/entities/account/User';
import UpdateSetting from '@unimark/core/lib/domain/use-cases/account/UpdateSetting';
import { observer } from 'mobx-react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface PropsType {
}

const MainGridContainer: React.FC<PropsType> = observer(() => {
  const { userStore } = useStores();
  const [setting, setSetting] = useState<Setting | null>(null);

  useEffect(() => {
    load();
  }, [userStore.user]);

  async function load() {
    if (!userStore.user) {
      return;
    }

    setSetting(await loadSetting(userStore.user));
  }

  function generateDOM() {
    if (!setting) {
      return <></>;
    }

    const layouts: Layouts = setting.layouts[App.WEB_MAIN];
    return layouts?.lg.map((l, i) => {
      return (
        <div key={i} className={l.static ? 'static' : ''}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  return (
    setting && <ResponsiveReactGridLayout
      className='layout'
      layouts={setting.layouts[App.WEB_MAIN]}
      rowHeight={30}
      onLayoutChange={async (layout: Layout[], allLayouts: Layouts) => {
        console.log(
          layout[15],
          allLayouts.lg && allLayouts.lg[15],
          allLayouts.md && allLayouts.md[15],
        );

        await updateLayout(setting, allLayouts);
        setSetting(setting);
      }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      compactType='vertical'
      verticalCompact={false}
      preventCollision={true}
      measureBeforeMount={true}
      useCSSTransforms={true}
    >
      {generateDOM()}
    </ResponsiveReactGridLayout>
  )
});

async function loadSetting(user: User): Promise<Setting> {
  let setting: Setting;

  const settings: Setting[] = await apply<FindSettingsBy>(
    CONTEXT.contexts.account.useCases.findSettingsBy,
    (it: FindSettingsBy) => it.options = {
      where: [['userId', '==', user.id]]
    }
  )
    .runOnce(async, queue)
    .toPromise();

  setting = settings[0];

  if (!setting) {
    setting = new Setting();
    setting.user = user;
    setting.layouts = { [App.WEB_MAIN]: DEFAULT_WEB_MAIN_LAYOUTS };
    await apply<CreateSetting>(
      CONTEXT.contexts.account.useCases.createSetting,
      (it: CreateSetting) => it.setting = setting
    )
      .runOnce(async, queue)
      .toPromise();
  }

  return setting;
}

async function updateLayout(setting: Setting, allLayouts: Layouts): Promise<boolean> {
  allLayouts = JSON.parse(JSON.stringify(allLayouts)); // clear undefined
  setting.layouts[App.WEB_MAIN] = allLayouts;

  const [_, success]: [Setting, boolean] = await apply<UpdateSetting>(
    CONTEXT.contexts.account.useCases.updateSetting,
    (it: UpdateSetting) => it.setting = setting
  )
    .runOnce(async, queue)
    .toPromise();

  return success;
}

export default MainGridContainer;