import React from 'react';
import { connect } from 'react-redux';
import CreateCowModal from './CreateCowModal';
import AddIncidentModal from './AddIncidentModal';
import ConfirmationModal from './ConfirmationModal';

const MODAL_COMPONENTS = {
  'CREATE_COW': CreateCowModal,
  'ADD_INCIDENT': AddIncidentModal,
  'CONFIRMATION': ConfirmationModal
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal { ...modalProps } />;
}

export default connect(state => state.modal)(ModalRoot);