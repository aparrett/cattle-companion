import { DISMISS_ERROR } from '../types/error';

export function dismissError() {
  return dispatch => {
    dispatch({ type: DISMISS_ERROR });
  }
}