import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, CLEAR_AUTH_ERROR } from '../types/auth';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { errorHandler } from './error';

const cookie = new Cookies();

export function registerUser({ email, name, password }, callback) {  
  return dispatch => {
    axios.post('/api/users', { email, name, password })
    .then(res => {
      cookie.set('token', res.data.token, { path: '/' });
      dispatch({ type: AUTH_USER, payload: res.data.user });
      callback();
    })
    .catch(({response}) => errorHandler(dispatch, AUTH_ERROR, response.status, response.data));
  }
}

export function loginUser({ email, password }, callback) {
  return dispatch => {
    axios.post('/api/auth', { email, password })
    .then(res => {
      cookie.set('token', res.data.token, { path: '/' });
      dispatch({ type: AUTH_USER, payload: res.data.user });
      if (callback) {
        callback();
      }
    })
    .catch(({response}) => errorHandler(dispatch, AUTH_ERROR, response.status, response.data));
  }
}

export function fetchUser(callback) {
  return dispatch => {
    axios.get('/api/me', {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(response => dispatch({
      type: AUTH_USER, 
      payload: response.data.user,
    }))
    .catch(({ response }) => {
      if (response.status === 401) {
        dispatch({ type: UNAUTH_USER });
        cookie.remove('token', { path: '/' });
        callback();
      }

      errorHandler(dispatch, AUTH_ERROR, response.status, response.data);
      if (callback) {
        callback();
      }
    });
  }
}

export function clearAuthError() {
  return dispatch => dispatch({ type: CLEAR_AUTH_ERROR });
}

export function logoutUser(history) {  
  return dispatch => {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    history.push('/login');
  }
}