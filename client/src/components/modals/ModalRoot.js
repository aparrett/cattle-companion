import React from 'react';
import { connect } from 'react-redux';
import AddIncidentModal from './AddIncidentModal';
import ConfirmationModal from './ConfirmationModal';

const MODAL_COMPONENTS = {
  'add_incident_modal': AddIncidentModal,
  'confirmation_modal': ConfirmationModal
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal { ...modalProps } />;
}

export default connect(state => state.modal)(ModalRoot);