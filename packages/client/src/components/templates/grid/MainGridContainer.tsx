import React, {
  FC,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Responsive,
} from 'react-grid-layout';
import {
  Layout,
  Layouts
} from '@unimark/core/lib/interfaces/account/setting';
import Setting from '@unimark/core/lib/domain/entities/account/Setting';
import useStores from '../../../utils/mobx';
import {
  Platform
} from '@unimark/core/lib/enums/account/setting';
import { observer } from 'mobx-react';
import WidthProvider from '../../organisms/grid/WidthProvider';
import AppContainer from '../../organisms/app/AppContainer';
import './grid.less';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface PropsType {
}

const MainGridContainer: FC<PropsType> = observer(() => {
  const { userStore } = useStores();
  const [setting, setSetting] = useState<Setting | null>(null);
  const [breakpoint, setBreakpoint] = useState<string | null>(null);

  useEffect(() => {
    setSetting(userStore.setting);
  }, [userStore.setting]);

  const generateContents = useCallback(() => {
    if (
      !breakpoint ||
      !setting
    ) {
      return null;
    }

    const layouts: Layouts = setting.layouts[Platform.WEB_MAIN];

    if (!layouts) {
      return null;
    }

    return layouts[breakpoint].map(layout => (
      <div key={layout.i} className={layout.static ? 'static' : ''}>
        <AppContainer layout={layout}/>
      </div>)
    );
  }, [breakpoint, setting, userStore.appMap]);

  return (
    setting && <ResponsiveReactGridLayout
      className={[
        'layout',
        userStore.isLayoutEditable ? 'edit' : ''
      ].join(' ')}
      layouts={setting.layouts[Platform.WEB_MAIN]}
      rowHeight={30}
      onLayoutChange={async (layout: Layout[], allLayouts: Layouts) => {
        await userStore.updateLayout(setting, allLayouts);
      }}
      onBreakpointChange={(breakpoint: string) => setBreakpoint(breakpoint)}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      compactType={null}
      preventCollision={true}
      measureBeforeMount={true}
      useCSSTransforms={false}
      isDraggable={userStore.isLayoutEditable}
      isResizable={userStore.isLayoutEditable}
    >
      {generateContents()}
    </ResponsiveReactGridLayout>
  )
});

export default MainGridContainer;
