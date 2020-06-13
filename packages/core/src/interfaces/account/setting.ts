import ReactGridLayout from 'react-grid-layout';

export interface Layout extends ReactGridLayout.Layout {
  i: string;
}

export interface Layouts extends ReactGridLayout.Layouts {
  [P: string]: Layout[];
}
