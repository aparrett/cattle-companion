import { SHOW_MODAL, HIDE_MODAL } from '../types/modal';

export function showCreateCow(farmId) {
  return dispatch => dispatch({
    type: SHOW_MODAL,
    modalType: 'CREATE_COW',
    modalProps: {
      farmId
    }
  });
}

export function showAddIncident(cow) {
  return dispatch => dispatch({
    type: SHOW_MODAL,
    modalType: 'ADD_INCIDENT',
    modalProps: {
      cow
    }
  });
}

export function hideModal() {
  return dispatch => dispatch({ type: HIDE_MODAL });
}