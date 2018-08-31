import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import InputField from './fields/InputField';
import { CowGenders } from '../enums';

class CowForm extends Component {
  async handleFormSubmit(formProps) {
    const cow = { ...formProps, farmId: this.props.farmId };
    this.props.action(cow, this.props.history);
  }
  
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="name" type="text" label="Name" className="form-control" component={InputField} />
        <label>
          <Field name="gender" type="radio" className="form-control" component={InputField} value={CowGenders.Cow} />Cow
        </label>
        <label>
          <Field name="gender" type="radio" ignoreError="true" className="form-control" component={InputField} value={CowGenders.Bull} />Bull
        </label>
        <Field name="dateOfBirth" label="Date of Birth" type="date" className="form-control" component={InputField} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
        <button type="submit" className="btn btn-primary">Save Cow</button>
      </form>
    );
  }
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

CowForm = withRouter(connect(null)(CowForm));

export default reduxForm({
  form: 'cowForm',
  validate
})(CowForm);