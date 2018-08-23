import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveFarm } from '../actions/farms';
import { Field, reduxForm } from 'redux-form';
import InputField from './fields/InputField';

class CreateFarm extends Component {
  handleFormSubmit(formProps) {
    this.props.saveFarm(formProps);
    this.props.reset();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h5>Create a New Farm</h5>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="name" className="form-control" component={InputField} placeholder="Name" type="text" />
          <button type="submit" className="btn btn-primary">Create</button>
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

  if (values.name && values.name.length < 1) {
    errors.name = 'Name cannot be empty.';
  }

  if (values.name && values.name.length > 100) {
    errors.name = 'Name cannot be longer than 100 characters.';
  }

  console.log('TODO: make sure form is validating');
}

CreateFarm = connect(null, { saveFarm })(CreateFarm);  

export default reduxForm({
  form: 'createFarm',
  validate
})(CreateFarm);