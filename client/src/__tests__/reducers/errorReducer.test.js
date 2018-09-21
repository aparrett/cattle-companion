import errorReducer from '../../reducers/errorReducer';
import { ERROR, DISMISS_ERROR } from '../../types/error';

describe('errorReducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual(null);
  });

  it('should handle ERROR', () => {
    const stateBefore = null;
    const action = { type: ERROR, payload: 'error' };
    const stateAfter = 'error';

    expect(errorReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle DISMISS_ERROR', () => {
    const stateBefore = 'error';
    const action = { type: DISMISS_ERROR };
    const stateAfter = null;

    expect(errorReducer(stateBefore, action)).toEqual(stateAfter);
  });
});