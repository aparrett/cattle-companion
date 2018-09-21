import modalReducer from '../../reducers/modalReducer';
import { SHOW_MODAL, HIDE_MODAL } from '../../types/modal';

describe('modalReducer', () => {
  it('should return initial state', () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalType: null,
      modalProps: {}
    });
  });

  it('should handle SHOW_MODAL', () => {
    const beforeState = {
      modalType: null,
      modalProps: {}
    };
    const action = { 
      type: SHOW_MODAL,
      modalType: 'confirmation', 
      modalProps: 1
    };
    const afterState = { 
      modalType: 'confirmation', 
      modalProps: 1
    };

    expect(modalReducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle HIDE_MODAL', () => {
    const beforeState = {
      modalType: 'confirmation', 
      modalProps: 1
    };
    const action = { type: HIDE_MODAL };
    const afterState = {
      modalType: null,
      modalProps: {}
    };

    expect(modalReducer(beforeState, action)).toEqual(afterState);
  });
});