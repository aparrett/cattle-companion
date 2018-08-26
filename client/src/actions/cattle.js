import { SAVE_COW } from '../types/cattle';
import { ERROR } from '../types/error';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { errorHandler } from './error';

const cookie = new Cookies();

export function saveCow(farmId, { name, gender, dateOfBirth }) {
  return dispatch => {
    axios.post(`/api/farms/${farmId}/cattle`, {
      name, gender, dateOfBirth
    }, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: SAVE_COW, payload: res.data }))
    .catch(({ response }) => {
      errorHandler(dispatch, ERROR, response.status, response.data);
    });
  }
}