import { FETCH_FARMS, SAVE_FARM } from '../types/farms';

export default function farmsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_FARMS: 
      return [...action.payload];
    case SAVE_FARM:
      return [ ...state, action.payload];
    default: 
      return state;
  }
}