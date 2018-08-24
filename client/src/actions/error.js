import { DISMISS_ERROR } from '../types/error';
import { logoutUser } from './auth';

export function dismissError() {
  return dispatch => {
    dispatch({ type: DISMISS_ERROR });
  }
}

export function errorHandler(dispatch, type, status, error) { 
  if (status === 400) {
    dispatch({
      type: type,
      payload: error
    });
  } else if (status === 401) {
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: 'Could not perform action at this time. Please try again later.'
    });
  }
}