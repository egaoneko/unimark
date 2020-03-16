import firebase from 'firebase';

export default class FirebaseProvider {

  protected static GET_OPTIONS: firebase.firestore.GetOptions = {
  };

  constructor(
    protected db: firebase.firestore.Firestore,
    protected auth: firebase.auth.Auth
  ) {
  }
}