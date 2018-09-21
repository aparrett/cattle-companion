import authReducer from '../../reducers/authReducer';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, CLEAR_AUTH_ERROR } from '../../types/auth';

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      user: null,
      error: '',
      authenticated: false
    });
  });

  it('should handle AUTH_USER', () => {
    const stateBefore = {
      user: null,
      error: '',
      authenticated: false
    };
    const action = {
      type: AUTH_USER,
      payload: { name: 'user' }
    };
    const stateAfter = {
      user: { name: 'user' },
      error: '',
      authenticated: true
    };

    expect(authReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle UNAUTH_USER', () => {
    const stateBefore = {
      user: null,
      error: '',
      authenticated: false
    };
    const action = { type: UNAUTH_USER };
    const stateAfter = {
      user: null,
      error: '',
      authenticated: false
    };

    expect(authReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle AUTH_ERROR', () => {
    const stateBefore = {
      user: { name: 'user' },
      error: '',
      authenticated: true
    };
    const action = {
      type: AUTH_ERROR,
      payload: 'Auth error.'
    };
    const stateAfter = {
      user: null,
      error: 'Auth error.',
      authenticated: false
    };

    expect(authReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle CLEAR_AUTH_ERROR', () => {
    const stateBefore = {
      user: null,
      error: 'Auth error.',
      authenticated: false
    };
    const action = { type: CLEAR_AUTH_ERROR };
    const stateAfter = {
      user: null,
      error: '',
      authenticated: false
    };

    expect(authReducer(stateBefore, action)).toEqual(stateAfter);
  });
});