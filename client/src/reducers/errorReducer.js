import { ERROR, DISMISS_ERROR } from '../types/error';

export default function errorReducer(state = null, action) {
  switch (action.type) {
    case ERROR:
      return action.payload;
    case DISMISS_ERROR:
      return null;
    default: 
      return state;
  }
}