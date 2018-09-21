import eligibleParentsReducer from '../../reducers/eligibleParentsReducer';          
import {  FETCH_ELIGIBLE_MOTHERS_SUCCESS,
          FETCH_ELIGIBLE_FATHERS_SUCCESS } from '../../types/cattle';

describe('eligibleParentsReducer', () => {
  it('should return initial state', () => {
    expect(eligibleParentsReducer(undefined, {})).toEqual({
      eligibleFathers: [],
      eligibleMothers: []
    });
  });

  it('should handle FETCH_ELIGIBLE_FATHERS_SUCCESS', () => {
    const stateBefore = { eligibleFathers: [], eligibleMothers: [] };
    const action = { 
      type: FETCH_ELIGIBLE_FATHERS_SUCCESS, 
      payload: [{ name: 'father' }] 
    };
    const stateAfter = { 
      eligibleFathers: [{ name: 'father' }],
      eligibleMothers: []
    };

    expect(eligibleParentsReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle FETCH_ELIGIBLE_MOTHERS_SUCCESS', () => {
    const stateBefore = { eligibleFathers: [], eligibleMothers: [] };
    const action = { 
      type: FETCH_ELIGIBLE_MOTHERS_SUCCESS, 
      payload: [{ name: 'mother' }] 
    };
    const stateAfter = { 
      eligibleFathers: [],
      eligibleMothers: [{ name: 'mother' }]
    };

    expect(eligibleParentsReducer(stateBefore, action)).toEqual(stateAfter);
  });
});          