import { FETCH_FARMS_SUCCESS, SAVE_FARM_SUCCESS } from '../types/farms';

export default function farmsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_FARMS_SUCCESS: 
      return [...action.payload];
    case SAVE_FARM_SUCCESS:
      return [ ...state, action.payload];
    default: 
      return state;
  }
}