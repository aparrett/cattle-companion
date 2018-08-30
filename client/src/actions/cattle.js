import { SAVE_COW_SUCCESS, FETCH_COW_PENDING, FETCH_COW_SUCCESS } from '../types/cattle';
import { ADD_INCIDENT_SUCCESS } from '../types/incidents';
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
    .then(res => dispatch({ type: SAVE_COW_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
  }
}

export function fetchCow(id) {
  return dispatch => {
    dispatch({ type: FETCH_COW_PENDING });

    axios.get(`/api/cattle/${id}`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_COW_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
  }
}

export function addIncident(cow, incident) {
  return dispatch => axios.patch(`/api/cattle/${cow._id}`, {
    incidents: [...cow.incidents, incident]
  }, {
    headers: { 'x-auth-token': cookie.get('token') }
  })
  .then(() => dispatch({ type: ADD_INCIDENT_SUCCESS, payload: incident }))
  .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}