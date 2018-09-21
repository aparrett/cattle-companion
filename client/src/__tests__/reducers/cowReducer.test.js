import cowReducer from '../../reducers/cowReducer';
import { ADD_INCIDENT_SUCCESS } from '../../types/incidents';
import {  FETCH_COW_PENDING, 
          FETCH_COW_SUCCESS,
          FETCH_COW_ERROR } from '../../types/cattle';

describe('cowReducer', () => {
  it('should return the inital state', () => {
    expect(cowReducer(undefined, {})).toEqual({
      cow: {},
      isLoading: false,
      error: null
    });
  });

  it('should handle FETCH_COW_PENDING', () => {
    const stateBefore = {
      cow: {},
      isLoading: false,
      error: null
    };
    const action = { type: FETCH_COW_PENDING };
    const stateAfter = {
      cow: {},
      isLoading: true,
      error: null
    };

    expect(cowReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle FETCH_COW_ERROR', () => {
    const stateBefore = {
      cow: {},
      isLoading: true,
      error: null
    };
    const action = { type: FETCH_COW_ERROR, payload: 'error' };
    const stateAfter = {
      cow: {},
      isLoading: false,
      error: 'error'
    };

    expect(cowReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle FETCH_COW_SUCCESS', () => {
    const stateBefore = {
      cow: {},
      isLoading: true,
      error: null
    };
    const action = { type: FETCH_COW_SUCCESS, payload: { name: 'cow' } };
    const stateAfter = {
      cow: { name: 'cow' },
      isLoading: false,
      error: null
    };

    expect(cowReducer(stateBefore, action)).toEqual(stateAfter);
  });


  it('should handle ADD_INCIDENT_SUCCESS', () => {
    const stateBefore = {
      cow: { name: 'cow', incidents: [] },
      isLoading: false,
      error: null
    };
    const action = { type: ADD_INCIDENT_SUCCESS, payload: { name: 'incident' } };
    const stateAfter = {
      cow: { name: 'cow', incidents: [{ name: 'incident' }] },
      isLoading: false,
      error: null
    };

    expect(cowReducer(stateBefore, action)).toEqual(stateAfter);
  });
});