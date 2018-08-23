import { FETCH_FARMS, SAVE_FARM } from '../types/farms';
import axios from 'axios';
import { ERROR } from '../types/error';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export function saveFarm() {
  return dispatch => {
    axios.post('/api/farms', {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => {
      dispatch({ type: SAVE_FARM, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR, payload: 'Could not perform action at this time. Please try again later.' });
    });
  }
}

export function fetchFarms() {
  return dispatch => {
    dispatch({ type: FETCH_FARMS, payload: [{_id: 1, name: 'fakeFarm1'}, {_id: 2, name: 'fakeFarm2'}]})
    // dispatch({ type: ERROR, payload: 'Could not perform action at this time. Please try again later.' });
  }
}