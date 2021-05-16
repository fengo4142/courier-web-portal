import { EffectsAs } from 'undux';
import { StoreStates } from './states';

export type StoreEffects = EffectsAs<StoreStates>;

const effects: StoreEffects = (stores) => {
  return stores;
};

export default effects;
