import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { saveCow } from '../../actions/cattle';
import { hideModal } from '../../actions/modals';
import InputField from '../fields/InputField';
import { CowGenders } from '../../enums';

class CreateCowModal extends Component {
  handleFormSubmit(formProps) {
    this.props.saveCow(this.props.farmId, formProps);
    this.props.reset();
    this.props.hideModal();
  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="modal show" tabIndex="-1" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Cow</h5>
              <button type="button" className="close" onClick={this.props.hideModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <Field name="name" type="text" label="Name" className="form-control" component={InputField} />
                <label>
                  <Field name="gender" type="radio" className="form-control" component={InputField} value={CowGenders.Cow} />Cow
                </label>
                <label>
                  <Field name="gender" type="radio" ignoreError="true" className="form-control" component={InputField} value={CowGenders.Bull} />Bull
                </label>
                <Field name="dateOfBirth" label="Date of Birth" type="date" className="form-control" component={InputField} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.props.hideModal}>Close</button>
              <button type="submit" className="btn btn-primary">Save Cow</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ modal }) {
  return { farmId: modal.modalProps.farmId };
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please enter a name.';
  }

  if (values.name && values.name.length > 100) {
    errors.name = 'Name cannot be longer than 100 characters.';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required.';
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  }

  return errors;
}

CreateCowModal = connect(mapStateToProps, { saveCow, hideModal })(CreateCowModal);

export default reduxForm({
  form: 'createCowModal',
  validate
})(CreateCowModal);