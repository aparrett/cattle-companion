import farmsReducer from '../../reducers/farmsReducer';
import {  FETCH_FARMS_SUCCESS, 
          FETCH_FARMS_PENDING,
          SAVE_FARM_SUCCESS, 
          DELETE_FARM_SUCCESS } from '../../types/farms';

describe('farmsReducer', () => {
  it('should return initial state', () => {
    expect(farmsReducer(undefined, {})).toEqual({
      farms: [],
      isLoading: false
    });
  });

  it('should handle FETCH_FARMS_PENDING', () => {
    const beforeState = { farms: [], isLoading: false };
    const action = { type: FETCH_FARMS_PENDING };
    const afterState = { farms: [], isLoading: true };

    expect(farmsReducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle FETCH_FARMS_SUCCESS', () => {
    const beforeState = { farms: [], isLoading: true };
    const action = { type: FETCH_FARMS_SUCCESS, payload: [{ name: 'farm' }] };
    const afterState = { farms: [{ name: 'farm' }], isLoading: false };

    expect(farmsReducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle SAVE_FARM_SUCCESS', () => {
    const beforeState = { farms: [], isLoading: false };
    const action = { type: SAVE_FARM_SUCCESS, payload: { name: 'farm' } };
    const afterState = { farms: [{ name: 'farm' }], isLoading: false };

    expect(farmsReducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle DELETE_FARM_SUCCESS', () => {
    const beforeState = { 
      farms: [{ _id: '1' }, { _id: '2' }], 
      isLoading: false 
    };
    const action = { type: DELETE_FARM_SUCCESS, payload: '1' };
    const afterState = { 
      farms: [{ _id: '2' }], 
      isLoading: false 
    };

    expect(farmsReducer(beforeState, action)).toEqual(afterState);
  });
});