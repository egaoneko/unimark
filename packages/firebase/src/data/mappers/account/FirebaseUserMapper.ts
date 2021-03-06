import firebase from '../../../externals/firebase';
import ValueMapper from '@unimark/core/lib/data/mappers/ValueMapper';
import User from '@unimark/core/lib/domain/entities/account/User';
import { Role } from '@unimark/core/lib/enums/account/user';

export default class FirebaseUserMapper implements ValueMapper<firebase.User, User> {
  public toEntity(fbUser: firebase.User): User {
    const user: User = new User();

    user.id = fbUser.uid;
    user.email = fbUser.email || '';
    user.name = fbUser.displayName || '';
    user.role = Role.USER || '';
    user.photo = fbUser.photoURL || '';

    return user;
  }
}