import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';

if (!firebase.apps.length) {
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
  // firebase.analytics();
} else {
  firebase.app();
}

export default firebase;