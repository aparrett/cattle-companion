import { FETCH_COW_SUCCESS, FETCH_COW_PENDING, FETCH_COW_ERROR } from '../types/cattle';
import { ADD_INCIDENT_SUCCESS } from '../types/incidents';
import { ERROR } from '../types/error';

const initialState = { cow: {}, isLoading: false, error: null };

export default function cowReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COW_PENDING:
      return { ...state, isLoading: true };
    case FETCH_COW_SUCCESS:
      return { ...state, cow: action.payload, isLoading: false };
    case FETCH_COW_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ADD_INCIDENT_SUCCESS:
      const cow = { ...state.cow, incidents: [...state.cow.incidents, action.payload] };
      return { ...state, cow };
    case ERROR:
      return { ...state };
    default:
      return state;
  }
}