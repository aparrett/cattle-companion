import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCow } from '../../actions/cattle';

class CreateCowModal extends Component {
  render() {
    return (
      <div>
        <div>Farmid: {this.props.farmId}</div>
        <div>This is a cow modal.</div>
      </div>
    );
  }
}

function mapStateToProps({ modal }) {
  return { farmId: modal.modalProps.farmId };
}

export default connect(mapStateToProps, { saveCow })(CreateCowModal);