import {
  Observable,
  of
} from 'rxjs';
import Repository from '../Repository';
// --ADD_IMPORT--

export default interface SearchRepository extends Repository {
  searchQuery(prop: any): Observable<any>;

  // --ADD_METHOD--
}