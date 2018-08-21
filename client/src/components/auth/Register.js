import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions/auth';

const form = reduxForm({  
  form: 'register',
  validate
});

class Register extends Component {
  renderField(field) {
    return (
      <div>
        <input className="form-control" {...field.input} />
        {field.touched && field.error && <div className="error">{field.error}</div>}
      </div>
    );
  }

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  renderError() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderError()}
        <div className="row">
          <div className="col-md-12">
            <label>Name</label>
            <Field name="name" className="form-control" component={this.renderField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Email</label>
            <Field name="email" className="form-control" component={this.renderField} type="email" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field name="password" className="form-control" component={this.renderField} type="password" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );
  }
}

function validate(values) {  
  const errors = {};

  if (!values.name) {
    errors.name = 'Please enter a first name';
  }

  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

function mapStateToProps(state) {  
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { registerUser })(form(Register));  