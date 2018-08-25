import { FETCH_FARM } from '../types/farms';

export default function farmReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_FARM:
      return { ...action.payload };
    default:
      return state;
  }
}