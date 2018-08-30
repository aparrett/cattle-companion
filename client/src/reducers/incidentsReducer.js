import { FETCH_INCIDENTS_SUCCESS } from '../types/incidents';

export default function incidentsReducer(state = [], action){
  switch (action.type) {
    case FETCH_INCIDENTS_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
}