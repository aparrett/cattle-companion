import {  FETCH_ELIGIBLE_MOTHERS_SUCCESS,
          FETCH_ELIGIBLE_FATHERS_SUCCESS } from '../types/cattle';

const initialState = { eligibleFathers: [], eligibleMothers: [] };

export default function eligibleParentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ELIGIBLE_FATHERS_SUCCESS: 
      return { ...state, eligibleFathers: [...action.payload] };
    case FETCH_ELIGIBLE_MOTHERS_SUCCESS: 
      return { ...state, eligibleMothers: [...action.payload] };
    default:
      return state;
  }
}