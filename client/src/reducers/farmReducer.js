import { FETCH_FARM_SUCCESS, FETCH_FARM_PENDING } from '../types/farms';
import { SAVE_COW_SUCCESS, DELETE_COW_SUCCESS } from '../types/cattle';

export default function farmReducer(state = {}, action) {
  let farm;
  
  switch (action.type) {
    case FETCH_FARM_PENDING: 
      return { ...state, isLoading: true };
    case FETCH_FARM_SUCCESS:
      return { farm: action.payload, isLoading: false };
    case SAVE_COW_SUCCESS:
      farm = { ...state.farm };
      (farm.cattle = farm.cattle || []).push(action.payload);
      return { ...state, farm, isLoading: false };
    case DELETE_COW_SUCCESS:
      farm = { ...state.farm };
      farm.cattle = farm.cattle.filter(c => c._id !== action.payload);
      return { ...state, farm };
    default:
      return state;
  }
}