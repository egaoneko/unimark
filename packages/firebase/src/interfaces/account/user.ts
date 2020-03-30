import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';
import { Role } from '@unimark/core/lib/enums/account/user';

export interface FirestoreUser extends Serializable {
  email: string;
  name: string;
  role: Role;
  photo?: string;
}