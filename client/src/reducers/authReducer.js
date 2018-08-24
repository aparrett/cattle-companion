import { AUTH_USER, AUTH_ERROR } from '../types/auth';

const INITIAL_STATE = { user: null, error: '', authenticated: false}

export default function (state = INITIAL_STATE, action) {  
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.payload, error: '', authenticated: true };
    case AUTH_ERROR:
      return { ...state, error: action.payload, authenticated: false };
    default:
      return state;
  }
}