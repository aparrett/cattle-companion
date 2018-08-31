import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import InputField from './fields/InputField';
import { CowGenders } from '../enums';
import { saveCow } from '../actions/cattle';

class CowCreateForm extends Component {
  handleFormSubmit(formProps) {
    const { match, saveCow, history} = this.props;
    const cow = { ...formProps, farmId: match.params.farmId };
    saveCow(cow, history);
  }
  
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1>Edit Cow</h1>
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
      </div>
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

CowCreateForm = reduxForm({
  form: 'cowCreateForm',
  validate
})(CowCreateForm);

export default withRouter(connect(null, { saveCow })(CowCreateForm));