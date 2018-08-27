import { FETCH_FARMS_SUCCESS, FETCH_FARMS_PENDING, SAVE_FARM_SUCCESS } from '../types/farms';

export default function farmsReducer(state = { farms: [], isLoading: false }, action) {
  switch (action.type) {
    case FETCH_FARMS_PENDING:
      return { ...state, isLoading: true };
    case FETCH_FARMS_SUCCESS: 
      return { farms: action.payload, isLoading: false };
    case SAVE_FARM_SUCCESS:
      return { farms: [ ...state.farms, action.payload], isLoading: false };
    default: 
      return state;
  }
}