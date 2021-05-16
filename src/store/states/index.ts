import { AuthState, User, DeliveryState } from '../../interfaces';

export * from './auth';
export * from './user';
export * from './delivery';

export interface StoreStates {
  authStore: AuthState;
  userStore: User;
  deliveryStore: DeliveryState;
}
