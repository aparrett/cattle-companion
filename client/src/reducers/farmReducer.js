import { FETCH_FARM_SUCCESS, LOADING_FARM } from '../types/farms';
import { SAVE_COW_SUCCESS } from '../types/cattle';

export default function farmReducer(state = {}, action) {
  switch (action.type) {
    case LOADING_FARM: 
      return { ...state, isLoading: true };
    case FETCH_FARM_SUCCESS:
      return { farm: action.payload, isLoading: false };
    case SAVE_COW_SUCCESS:
      const farm = state.farm;
      (farm.cattle = farm.cattle || []).push(action.payload);
      return { ...state, farm };
    default:
      return state;
  }
}