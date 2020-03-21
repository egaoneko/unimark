import React from 'react';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import CreateUser from '@unimark/core/lib/domain/use-cases/account/CreateUser';
import { apply } from '@unimark/core/lib/utils/common';
import firebase from '@unimark/firebase/lib/externals/firebase';
import SignInTemplate from '../../components/templates/account/SignInTemplate';
import { CONTEXT } from '../../constant/context';
import {
  main,
  signIn
} from '../../utils/router';
import FirebaseUserMapper from '@unimark/firebase/lib/data/mappers/account/FirebaseUserMapper';
import { UiConfig } from '@unimark/firebase/lib/components/molecules/FirebaseAuth';

interface PropsType {
}

const SignInPage: React.FC<PropsType> = () => {
  const uiConfig: UiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (credential: firebase.auth.UserCredential, redirectUrl: string) => {
        if (credential && credential.user) {
          apply<CreateUser>(
            CONTEXT.useCases.createUser,
            (it: CreateUser) => it.user = new FirebaseUserMapper().toEntity(credential.user as firebase.User)
          )
            .runOnce(async, queue)
            .subscribe(() => {
              main();
            }, (err: any) => {
              console.error(err);
              signIn();
            });
        } else {
          signIn();
        }
        return false;
      }
    }
  };

  return (
    <SignInTemplate uiConfig={uiConfig}/>
  );
};

export default SignInPage;