import { FETCH_FARM } from '../types/farms';
import { SAVE_COW } from '../types/cattle';

export default function farmReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_FARM:
      return { ...action.payload };
    case SAVE_COW:
      const farm = { ...state };
      (farm.cattle = farm.cattle || []).push(action.payload);
      return farm;
    default:
      return state;
  }
}