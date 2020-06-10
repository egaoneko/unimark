import 'animate.css/animate.css';
import './src/styles/common.css';
import onServiceWorkerUpdateReady from './src/libs/onServiceWorkerUpdateReady';
import wrapWithProvider from './src/libs/wrapRootElement';

export const wrapRootElement = wrapWithProvider;

export {
  onServiceWorkerUpdateReady
};
