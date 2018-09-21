import { FETCH_FARM_SUCCESS, FETCH_FARM_PENDING } from '../types/farms';
import { DELETE_COW_SUCCESS } from '../types/cattle';

export default function farmReducer(state = {}, action) {
  
  switch (action.type) {
    case FETCH_FARM_PENDING: 
      return { ...state, isLoading: true };
    case FETCH_FARM_SUCCESS:
      return { farm: action.payload, isLoading: false };
    case DELETE_COW_SUCCESS:
      const farm = { ...state.farm };
      farm.cattle = farm.cattle.filter(c => c._id !== action.payload);
      return { ...state, farm };
    default:
      return state;
  }
}