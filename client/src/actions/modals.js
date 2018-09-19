import { SHOW_MODAL, HIDE_MODAL, ADD_INCIDENT_MODAL, CONFIRMATION_MODAL } from '../types/modal';

export function showAddIncident(cow) {
  return dispatch => dispatch({
    type: SHOW_MODAL,
    modalType: ADD_INCIDENT_MODAL,
    modalProps: { cow }
  });
}

export function showConfirmation(id, title, action) {
  return dispatch => dispatch({
    type: SHOW_MODAL,
    modalType: CONFIRMATION_MODAL,
    modalProps: { id, title, action }
  });
}

export function hideModal() {
  return dispatch => dispatch({ type: HIDE_MODAL });
}
