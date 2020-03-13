import React, { useState } from 'react';
import {
  Responsive,
  WidthProvider
} from 'react-grid-layout';
import './grid.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface PropsType {
}

const MainGridContainer: React.FC<PropsType> = () => {
  const layout = [{ 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0', 'static': false }, {
    'x': 2,
    'y': 0,
    'w': 2,
    'h': 3,
    'i': '1',
    'static': false
  }, { 'x': 4, 'y': 0, 'w': 2, 'h': 4, 'i': '2', 'static': false }, {
    'x': 4,
    'y': 0,
    'w': 2,
    'h': 5,
    'i': '3',
    'static': false
  }, { 'x': 4, 'y': 0, 'w': 2, 'h': 3, 'i': '4', 'static': false }, {
    'x': 0,
    'y': 0,
    'w': 2,
    'h': 2,
    'i': '5',
    'static': false
  }, { 'x': 2, 'y': 4, 'w': 2, 'h': 4, 'i': '6', 'static': false }, {
    'x': 0,
    'y': 3,
    'w': 2,
    'h': 3,
    'i': '7',
    'static': false
  }, { 'x': 10, 'y': 3, 'w': 2, 'h': 3, 'i': '8', 'static': false }, {
    'x': 6,
    'y': 3,
    'w': 2,
    'h': 3,
    'i': '9',
    'static': false
  }, { 'x': 8, 'y': 2, 'w': 2, 'h': 2, 'i': '10', 'static': false }, {
    'x': 0,
    'y': 5,
    'w': 2,
    'h': 5,
    'i': '11',
    'static': false
  }, { 'x': 6, 'y': 6, 'w': 2, 'h': 3, 'i': '12', 'static': false }, {
    'x': 4,
    'y': 4,
    'w': 2,
    'h': 2,
    'i': '13',
    'static': false
  }, { 'x': 8, 'y': 4, 'w': 2, 'h': 2, 'i': '14', 'static': false }, {
    'x': 4,
    'y': 8,
    'w': 2,
    'h': 4,
    'i': '15',
    'static': false
  }, { 'x': 8, 'y': 8, 'w': 2, 'h': 4, 'i': '16', 'static': false }, {
    'x': 10,
    'y': 10,
    'w': 2,
    'h': 5,
    'i': '17',
    'static': false
  }, { 'x': 8, 'y': 12, 'w': 2, 'h': 4, 'i': '18', 'static': false }, {
    'x': 4,
    'y': 12,
    'w': 2,
    'h': 4,
    'i': '19',
    'static': false
  }, { 'x': 8, 'y': 9, 'w': 2, 'h': 3, 'i': '20', 'static': false }, {
    'x': 2,
    'y': 9,
    'w': 2,
    'h': 3,
    'i': '21',
    'static': false
  }, { 'x': 4, 'y': 12, 'w': 2, 'h': 4, 'i': '22', 'static': false }, {
    'x': 8,
    'y': 6,
    'w': 2,
    'h': 2,
    'i': '23',
    'static': false
  }, { 'x': 0, 'y': 8, 'w': 2, 'h': 2, 'i': '24', 'static': false }];
  const defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function () {
    },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: layout,
    compactType: 'vertical',
    verticalCompact: false,
    preventCollision: true,
  };
  const [breakpoint, setBreakpoint] = useState<string>('lg');
  const [mounted, setMounted] = useState<boolean>(false);
  const [layouts, setLayouts] = useState({ lg: defaultProps.initialLayout });

  function generateDOM() {
    return layouts.lg.map((l, i) => {
      return (
        <div key={i} className={l.static ? "static" : ""}>
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
    <ResponsiveReactGridLayout
      {...defaultProps}
      // WidthProvider option
      measureBeforeMount={false}
      // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
      // and set `measureBeforeMount={true}`.
      layouts={layouts}
      useCSSTransforms={mounted}
    >
      {generateDOM()}
    </ResponsiveReactGridLayout>
  )
};

export default MainGridContainer;