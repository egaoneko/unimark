import firebase from '../externals/firebase';
import { auth } from '../externals/firebase';

export function onAuthStateChanged(
  nextOrObserver:
    | firebase.Observer<any>
    | ((a: firebase.User | null) => any),
  error?: (a: firebase.auth.Error) => any,
  completed?: firebase.Unsubscribe
): firebase.Unsubscribe {
  return auth?.onAuthStateChanged(nextOrObserver, error, completed);
}

export function getCurrentUser(): firebase.User | null {
  return auth?.currentUser;
}

export function signOut(): Promise<void> {
  return auth?.signOut();
}