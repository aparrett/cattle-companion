import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modals';

const ConfirmationModal = ({ action, id, title, hideModal }) => {
  const handleConfirmClick = () => {
    action(id);
    hideModal();
  };

  return (
    <div className="modal show">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" onClick={hideModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={hideModal}>No</button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              onClick={() => handleConfirmClick(action, id, hideModal)}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, { hideModal })(ConfirmationModal);