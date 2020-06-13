import React, {
  useEffect,
  useState
} from 'react';
import {
  Responsive,
} from 'react-grid-layout';
import './grid.css';
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

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface PropsType {
}

const MainGridContainer: React.FC<PropsType> = observer(() => {
  const { userStore } = useStores();
  const [setting, setSetting] = useState<Setting | null>(null);

  useEffect(() => {
    setSetting(userStore.setting);
  }, [userStore.setting]);

  function generateDOM() {
    if (!setting) {
      return <></>;
    }

    const layouts: Layouts = setting.layouts[Platform.WEB_MAIN];
    return layouts?.lg.map(layout => (
      <div key={layout.i} className={layout.static ? 'static' : ''}>
        <AppContainer layout={layout}/>
      </div>)
    );
  }

  return (
    setting && <ResponsiveReactGridLayout
      className='layout'
      layouts={setting.layouts[Platform.WEB_MAIN]}
      rowHeight={30}
      onLayoutChange={async (layout: Layout[], allLayouts: Layouts) => {
        await userStore.updateLayout(setting, allLayouts);
        setSetting(setting);
      }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      compactType={null}
      preventCollision={true}
      measureBeforeMount={true}
      useCSSTransforms={false}
    >
      {generateDOM()}
    </ResponsiveReactGridLayout>
  )
});

export default MainGridContainer;
