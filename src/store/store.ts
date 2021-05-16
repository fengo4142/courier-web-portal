import { createConnectedStoreAs } from 'undux';
import effects from './effects';
import { initAuth, initUser, initDelivery, StoreStates } from './states';

const { Container: StoreContainer, useStores, withStores } = createConnectedStoreAs<StoreStates>(
  {
    authStore: initAuth(),
    userStore: initUser(),
    deliveryStore: initDelivery()
  },
  effects
);

export { StoreContainer, useStores, withStores };
