import { AppLayouts } from '@unimark/core/lib/domain/entities/account/Setting';

export interface FirebaseSetting {
  userId: string;
  layouts: AppLayouts;
}