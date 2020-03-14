import firebase from 'firebase';

export default class FirebaseProvider {
  constructor(
    protected db: firebase.database.Database,
    protected auth: firebase.auth.Auth
  ) {
  }
}