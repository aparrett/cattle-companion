import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveFarm } from '../actions/farms';
import { Field, reduxForm } from 'redux-form';
import InputField from './fields/InputField';
import validate from '../validation/validateFarm';

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

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps);

FarmCreateForm = connect(
  null,
  { saveFarm },
  mergeProps
)(FarmCreateForm);

export default reduxForm({
  form: 'farmCreateForm',
  validate
})(FarmCreateForm);
