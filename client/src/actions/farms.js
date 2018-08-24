import { FETCH_FARMS, SAVE_FARM } from '../types/farms';
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
    .then(res => {
      dispatch({ type: SAVE_FARM, payload: res.data });
    })
    .catch(({ response }) => {
      errorHandler(dispatch, ERROR, response.status, response.data);
    });
  }
}

export function fetchFarms() {
  return dispatch => {
    axios.get('/api/me/farms', {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => {
      dispatch({ type: FETCH_FARMS, payload: res.data })
    })
    .catch(({ response }) => {
      errorHandler(dispatch, ERROR, response.status);
    });
  }
}