import axios from 'axios';
import cookie from '../utils/cookie';
import { errorHandler } from './error';
import { ERROR } from '../types/error';
import { FETCH_FARMS_SUCCESS, 
         SAVE_FARM_SUCCESS, 
         FETCH_FARM_SUCCESS, 
         FETCH_FARM_PENDING,
         FETCH_FARMS_PENDING, 
         DELETE_FARM_SUCCESS } from '../types/farms';

export function saveFarm({ name }) {
  return dispatch => axios.post('/api/farms', { name }, {
    headers: { 'x-auth-token': cookie.get('token') }
  })
  .then(res => dispatch({ type: SAVE_FARM_SUCCESS, payload: res.data }))
  .catch(({ response }) => {
    errorHandler(dispatch, ERROR, response.status, response.data)
  });
}

export function fetchFarm(id) {
  return dispatch => {
    dispatch({ type: FETCH_FARM_PENDING });

    return axios.get(`/api/farms/${id}`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => {
      dispatch({ type: FETCH_FARM_SUCCESS, payload: res.data })
    })
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status));
  }
}

export function fetchFarms() {
  return dispatch => {
    dispatch({ type: FETCH_FARMS_PENDING });

    return axios.get('/api/me/farms', {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_FARMS_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status));
  }
}

export function deleteFarm(id) {
  return dispatch => axios.delete(`/api/farms/${id}`, {
    headers: { 'x-auth-token': cookie.get('token') }
  })
  .then(() => dispatch({ type: DELETE_FARM_SUCCESS, payload: id }))
  .catch(({ response }) => errorHandler(dispatch, ERROR, response.status));
}