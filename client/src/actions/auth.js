import axios from 'axios';
import Cookies from 'universal-cookie';
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER } from '../types/auth';

const cookie = new Cookies();

export function registerUser({ email, name, password }, callback) {  
  return dispatch => {
    axios.post('/api/users', { email, name, password })
    .then(res => {
      cookie.set('token', res.data.token, { path: '/' });
      dispatch({ type: AUTH_USER, payload: res.data.user });
      callback();
    })
    .catch(({response}) => {
      if (response.status === 400) {
        errorHandler(dispatch, response, AUTH_ERROR);
      } else {
        errorHandler(dispatch, 'Unable to register at this time.', AUTH_ERROR);
      }
    });
  }
}

export function loginUser({ email, password }, callback) {
  return dispatch => {
    axios.post('/api/auth', { email, password })
    .then(res => {
      cookie.set('token', res.data.token, { path: '/' });
      dispatch({ type: AUTH_USER, payload: res.data.user });
      callback();
    })
    .catch(({response}) => {
      if (response.status === 400) {
        errorHandler(dispatch, response, AUTH_ERROR);
      } else {
        errorHandler(dispatch, 'Unable to login at this time.', AUTH_ERROR);
      }
    });
  }
}

export function logoutUser() {  
  return dispatch => {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
  }
}

export function fetchUser(callback) {
  return dispatch => {
    axios.get('/api/users/me', {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(response => {
      dispatch({
        type: AUTH_USER, 
        payload: response.data.user,
      });
    })
    .catch(error => {
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