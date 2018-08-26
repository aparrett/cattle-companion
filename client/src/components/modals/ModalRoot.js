import React from 'react';
import { connect } from 'react-redux';
import CreateCowModal from './CreateCowModal';

const MODAL_COMPONENTS = {
  'CREATE_COW': CreateCowModal
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal { ...modalProps } />;
}

export default connect(state => state.modal)(ModalRoot);