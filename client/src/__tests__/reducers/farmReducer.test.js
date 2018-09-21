import farmReducer from '../../reducers/farmReducer';
import { FETCH_FARM_SUCCESS, FETCH_FARM_PENDING } from '../../types/farms';
import { DELETE_COW_SUCCESS } from '../../types/cattle';

describe('farmReducer', () => {
  it('should return initial state', () => {
    expect(farmReducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_FARM_PENDING', () => {
    const stateBefore = {};
    const action = { type: FETCH_FARM_PENDING };
    const stateAfter = { isLoading: true };

    expect(farmReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle FETCH_FARM_SUCCESS', () => {
    const stateBefore = { isLoading: true };
    const action = { type: FETCH_FARM_SUCCESS, payload: { name: 'farm' } };
    const stateAfter = { farm: { name: 'farm' }, isLoading: false };

    expect(farmReducer(stateBefore, action)).toEqual(stateAfter);
  });
  
  it('should handle DELETE_COW_SUCCESS', () => {
    const cowId = '1';
    const stateBefore = { 
      farm: { name: 'farm', cattle: [{ _id: cowId }] }, 
      isLoading: false 
    };
    const action = { type: DELETE_COW_SUCCESS, payload: cowId };
    const stateAfter = { 
      farm: { name: 'farm', cattle: [] }, 
      isLoading: false 
    };

    expect(farmReducer(stateBefore, action)).toEqual(stateAfter);
  });
});