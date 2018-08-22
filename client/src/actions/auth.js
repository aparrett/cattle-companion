import axios from 'axios';
import Cookies from 'universal-cookie';
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER } from './types';

const cookie = new Cookies();

export function registerUser({ email, name, password }, callback) {  
  console.log('reg user')
  return function(dispatch) {
    axios.post('/api/users', { email, name, password })
    .then(response => {
      cookie.set('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER, payload: response.data.user });
      callback();
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  console.log('log out user')
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
  }
}

export function fetchUser(callback) {
  return function(dispatch) {
    axios.get('/api/users/me', {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(response => {
      dispatch({
        type: AUTH_USER, 
        payload: response.data.user,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
      if (callback) {
        callback();
      }
    });
  }
}

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if (error && error.data && error.data.error) {
    errorMessage = error.data.error;
  } else if (error && error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error && error.status === 401) {
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