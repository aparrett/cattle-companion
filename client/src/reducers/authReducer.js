import { AUTH_USER,  
         UNAUTH_USER,
         AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = { user: null, error: '', message: '', content: '', authenticated: false}

export default function (state = INITIAL_STATE, action) {  
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', user: action.payload, authenticated: true };
    case UNAUTH_USER:
      return { ...state, user: null, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}