import Serializable from '@unimark/core/lib/interfaces/definitions/Serializable';
import { AppLayouts } from '@unimark/core/lib/domain/entities/account/Setting';

export interface FirestoreSetting extends Serializable {
  userId: string;
  layouts: AppLayouts;
}