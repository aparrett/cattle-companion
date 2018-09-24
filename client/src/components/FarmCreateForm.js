import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveFarm } from '../actions/farms';
import { Field, reduxForm } from 'redux-form';
import InputField from './fields/InputField';

class FarmCreateForm extends Component {
  handleFormSubmit(formProps) {
    this.props.saveFarm(formProps);
    this.props.reset();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h5 className="mb-3">Create a New Farm</h5>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="name" label="Name" component={InputField} type="text" />
          <button type="submit" className="btn btn-outline-primary mt-2">
            Save Farm
          </button>
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

  return errors;
}

FarmCreateForm = connect(
  null,
  { saveFarm }
)(FarmCreateForm);

export default reduxForm({
  form: 'farmCreateForm',
  validate
})(FarmCreateForm);
