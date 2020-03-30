import {
  Observable,
  of
} from 'rxjs';
import Repository from '../Repository';
import Query from '../../entities/search/Query';
import Result from '../../entities/search/Result';
// --ADD_IMPORT--

export default interface SearchRepository extends Repository {
  searchQuery(query: Query): Observable<Result>;

  // --ADD_METHOD--
}