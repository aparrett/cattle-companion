import axios from 'axios';
import Cookies from 'universal-cookie';
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER } from './types';

const cookie = new Cookies();

export function registerUser({ email, name, password }) {  
  return function(dispatch) {
    axios.post('/api/users', { email, name, password })
    .then(response => {
      cookie.set('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = '/';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    window.location.href = '/login';
  }
}

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}