import firebase from 'firebase/app';
import { IS_SSR } from '../constant';

if (
  !IS_SSR &&
  !firebase.apps.length
) {
  firebase.initializeApp({
    appId: '1:845966195286:web:c5597abcc470f6597e19f7',
    apiKey: 'AIzaSyA9Mj3huKl-TMxlv0xeIuTFcqEcq8DXp9k',
    authDomain: 'personal-fb.firebaseapp.com',
    databaseURL: 'personal-fb.firebaseio.com',
    projectId: 'personal-fb',
    storageBucket: 'personal-fb.appspot.com',
    messagingSenderId: '845966195286',
    measurementId: 'G-F78SJ2SEKJ'
  });
}

let db: firebase.database.Database;
let auth: firebase.auth.Auth;

if (
  !IS_SSR
) {
  db = firebase.database();
  auth = firebase.auth();
}

export {
  db,
  auth
}

export default firebase;