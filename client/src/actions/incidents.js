import axios from 'axios';
import { FETCH_INCIDENTS_SUCCESS } from '../types/incidents';

export function fetchIncidents() {
  return dispatch => axios.get('/api/incidents')
    .then(res => dispatch({
      type: FETCH_INCIDENTS_SUCCESS, payload: res.data
    }));
}