import * as React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { auth } from '../../externals/firebase';

export type UiConfig = firebaseui.auth.Config;
export type AuthUIError = firebaseui.auth.AuthUIError;

interface PropsType {
  uiConfig: UiConfig,
}

const FirebaseAuth: React.FC<PropsType> = ({ uiConfig }) => {
  return (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={auth}/>
  )
};

export default FirebaseAuth;