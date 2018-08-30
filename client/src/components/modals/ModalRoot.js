import React from 'react';
import { connect } from 'react-redux';
import CreateCowModal from './CreateCowModal';
import AddIncidentModal from './AddIncidentModal';

const MODAL_COMPONENTS = {
  'CREATE_COW': CreateCowModal,
  'ADD_INCIDENT': AddIncidentModal
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal { ...modalProps } />;
}

export default connect(state => state.modal)(ModalRoot);