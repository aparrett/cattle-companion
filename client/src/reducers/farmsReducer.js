import {  FETCH_FARMS_SUCCESS, 
          FETCH_FARMS_PENDING,
          SAVE_FARM_SUCCESS, 
          DELETE_FARM_SUCCESS } from '../types/farms';

export default function farmsReducer(state = { farms: [], isLoading: false }, action) {
  switch (action.type) {
    case FETCH_FARMS_PENDING:
      return { ...state, isLoading: true };
    case FETCH_FARMS_SUCCESS: 
      return { farms: action.payload, isLoading: false };
    case DELETE_FARM_SUCCESS:
      const farms = [...state.farms];
      const indexToDelete = farms.findIndex(farm => farm._id === action.payload);
      if (indexToDelete !== -1) farms.splice(indexToDelete, 1);
      return { ...state, farms };
    case SAVE_FARM_SUCCESS:
      return { ...state, farms: [ ...state.farms, action.payload] };
    default: 
      return state;
  }
}