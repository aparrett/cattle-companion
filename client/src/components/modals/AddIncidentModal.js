import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addIncident } from '../../actions/cattle';
import { hideModal } from '../../actions/modals';
import InputField from '../fields/InputField';

class AddIncidentModal extends Component {
  handleFormSubmit(formProps) {
    this.props.addIncident(this.props.cow, formProps);
    this.props.reset();
    this.props.hideModal();
  }

  renderIncidentsSelect(field) {
    const renderIncidentOptions = incidents => incidents
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .map((incident, i) => (
        <option key={i} value={incident.name}>{incident.name}</option>
      ));

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          <option value="">Select...</option>
          {renderIncidentOptions(field.incidents)}
        </select>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="modal show" 
            tabIndex="-1" 
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Incident to Cow - {this.props.cow.name}</h5>
              <button type="button" className="close" onClick={this.props.hideModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Field
                name="name" 
                label="Incident"
                className="form-control" 
                incidents={this.props.incidents}
                component={this.renderIncidentsSelect} 
                placeholder="Name" 
              />
              <Field 
                name="date" 
                type="date" 
                label="Date"
                className="form-control" 
                component={InputField} 
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.props.hideModal}>Close</button>
              <button type="submit" className="btn btn-primary">Add Incident</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ modal, incidents }) {
  return { cow: modal.modalProps.cow, incidents };
}

function validate(values) {
  const errors = {};

  if (!values.incident) {
    errors.incident = 'Please select an incident.';
  }

  return errors;
}

AddIncidentModal = connect(mapStateToProps, { hideModal, addIncident })(AddIncidentModal);

export default reduxForm({
  form: 'addIncidentModal',
  validate
})(AddIncidentModal);

