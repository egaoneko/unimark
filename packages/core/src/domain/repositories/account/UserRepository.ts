import { Observable } from 'rxjs';
import Repository from '../Repository';
import User from '../../entities/account/User';
import { Options } from '../../../interfaces/repository/options';
// --ADD_IMPORT--

export default interface UserRepository extends Repository {

  getCurrentUser(): Observable<User | null>;

  getCurrentUserToken(): Observable<string | null>;

  createUser(user: User): Observable<[User, boolean]>;

  findUsersBy(options: Options): Observable<User[]>;

  updateUser(user: User): Observable<[User, boolean]>;

  deleteUser(user: User): Observable<[User, boolean]>;

  countUsers(options: Options): Observable<number>;

  // --ADD_METHOD--
}