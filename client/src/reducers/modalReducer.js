import { SHOW_MODAL, HIDE_MODAL } from '../types/modal';

const initialState = {
  modalType: null,
  modalProps: {}
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}