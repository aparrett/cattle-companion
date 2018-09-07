import { SHOW_MODAL, HIDE_MODAL } from '../types/modal';

export function showAddIncident(cow) {
  return dispatch => dispatch({
    type: SHOW_MODAL,
    modalType: 'ADD_INCIDENT',
    modalProps: { cow }
  });
}

export function showConfirmation(id, title, action) {
  return dispatch => dispatch({
    type: SHOW_MODAL,
    modalType: 'CONFIRMATION',
    modalProps: { action, id, title }
  });
}

export function hideModal() {
  return dispatch => dispatch({ type: HIDE_MODAL });
}
