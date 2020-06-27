import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';
import { SearchEngine } from '@unimark/core/lib/enums/search/engine';

export interface FirestoreHistory extends Serializable {
  userId: string;
  word: string;
  engine: SearchEngine;
  link: string;
  createdAt: number;
  updatedAt: number;
}
