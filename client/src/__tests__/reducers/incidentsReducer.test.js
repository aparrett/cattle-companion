import incidentsReducer from '../../reducers/incidentsReducer';
import { FETCH_INCIDENTS_SUCCESS } from '../../types/incidents';

describe('incidentsReducer', () => {
  it('should return initial state', () => {
    expect(incidentsReducer(undefined, {})).toEqual([]);
  });

  it('should handle FETCH_INCIDENTS_SUCCESS', () => {
    const action = { 
      type: FETCH_INCIDENTS_SUCCESS, 
      payload: [{ name: 'incident' }]
    };
    const afterState = [{ name: 'incident' }];

    expect(incidentsReducer([], action)).toEqual(afterState);
  });
});