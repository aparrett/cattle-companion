import { SAVE_COW } from '../types/cattle';

export function saveCow(cow) {
  return dispatch => {
    dispatch({ type: SAVE_COW, payload: { name: 'foo' } });
  }
}