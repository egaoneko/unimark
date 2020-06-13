import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';
import { AppType } from '@unimark/core/lib/enums/account/app';

export interface FirestoreApp extends Serializable {
  userId: string;
  type: AppType;
  data: any;
}
