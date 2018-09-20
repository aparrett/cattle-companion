import axios from 'axios';
import moment from 'moment';
import cookie from '../utils/cookie';

import { errorHandler } from './error';
import { ERROR } from '../types/error';
import { ADD_INCIDENT_SUCCESS } from '../types/incidents';
import {  FETCH_COW_PENDING, 
          FETCH_COW_SUCCESS,
          FETCH_COW_ERROR,
          DELETE_COW_SUCCESS,
          FETCH_ELIGIBLE_FATHERS_SUCCESS,
          FETCH_ELIGIBLE_MOTHERS_SUCCESS } from '../types/cattle';

export function fetchCow(id) {
  return dispatch => {
    dispatch({ type: FETCH_COW_PENDING });

    return axios.get(`/api/cattle/${id}`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_COW_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, FETCH_COW_ERROR, response.status, response.data));
  }
}

export function saveCow({ name, gender, dateOfBirth, farm, mother, father }, history) {
  return dispatch => axios
    .post(`/api/farms/${farm}/cattle`, {
      name, gender, dateOfBirth, mother, father
    }, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => history.push(`/farms/${farm}/cattle/${res.data._id}`))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}

export function editCow({ _id, name, gender, dateOfBirth, farm, mother, father }, history) {
  return dispatch => axios
    .put(`/api/cattle/${_id}`, {
      name, gender, dateOfBirth, farm, mother, father
    }, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => history.push(`/farms/${farm}/cattle/${res.data._id}`))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}

export function addIncident(cow, incident) {
  incident.date = moment(incident.date).format('MM/DD/YYYY');
  
  return dispatch => axios
    .patch(`/api/cattle/${cow._id}`, {
      incidents: [...cow.incidents, incident]
    }, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(() => dispatch({ type: ADD_INCIDENT_SUCCESS, payload: incident }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}

export function deleteCow(id) {
  return dispatch => axios
    .delete(`/api/cattle/${id}`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(() => dispatch({ type: DELETE_COW_SUCCESS, payload: id }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}

export function fetchEligibleFathers(cowId) {
  return dispatch => axios
    .get(`/api/cattle/${cowId}/eligible-fathers`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_ELIGIBLE_FATHERS_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}

export function fetchEligibleMothers(cowId) {
  return dispatch => axios
    .get(`/api/cattle/${cowId}/eligible-mothers`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_ELIGIBLE_MOTHERS_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}

export function fetchEligibleFathersByFarm(farmId) {
  return dispatch => axios
    .get(`/api/farms/${farmId}/cattle/eligible-fathers`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_ELIGIBLE_FATHERS_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}

export function fetchEligibleMothersByFarm(farmId) {
  return dispatch => axios
    .get(`/api/farms/${farmId}/cattle/eligible-mothers`, {
      headers: { 'x-auth-token': cookie.get('token') }
    })
    .then(res => dispatch({ type: FETCH_ELIGIBLE_MOTHERS_SUCCESS, payload: res.data }))
    .catch(({ response }) => errorHandler(dispatch, ERROR, response.status, response.data));
}