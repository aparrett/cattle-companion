import { FETCH_FARMS_SUCCESS, SAVE_FARM_SUCCESS, FETCH_FARM_SUCCESS, LOADING_FARM } from '../types/farms';
import { ERROR } from '../types/error';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { errorHandler } from './error';

const cookie = new Cookies();

export function saveFarm({ name }) {
  return dispatch => {
    axios.post('/api/farms', { name }, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: SAVE_FARM_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
  }
}

export function fetchFarm(id) {
  return dispatch => {
    dispatch({ type: LOADING_FARM });

    axios.get(`/api/farms/${id}`, {
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
    axios.get('/api/me/farms', {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_FARMS_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status));
  }
}