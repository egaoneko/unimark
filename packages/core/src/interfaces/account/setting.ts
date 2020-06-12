import ReactGridLayout from 'react-grid-layout';
import { App } from '../../enums/account/setting';

export interface Layout extends ReactGridLayout.Layout {
  i: App;
}

export interface Layouts extends ReactGridLayout.Layouts {
  [P: string]: Layout[];
}
