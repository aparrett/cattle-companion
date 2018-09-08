import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { registerUser, loginUser, clearAuthError } from '../../actions/auth';

import InputField from '../fields/InputField';

class Register extends Component {
  componentDidMount() {
    this.props.clearAuthError();
  }

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps, () => this.props.history.push('/'));
  }

  handleGuestClick() {
    this.props.loginUser({ 
      email: 'guest@test.com', 
      password: 'password' 
    }, () => this.props.history.push('/'));
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="mb-2">Taking the app for a spin? Click <a onClick={this.handleGuestClick.bind(this)}>here</a> to login as a guest.</div>
        {error && <div className="invalid-feedback mb-3">{error}</div>}
        <div className="row">
          <div className="col-md-12">
            <label>Name</label>
            <Field name="name" className="form-control" component={InputField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Email</label>
            <Field name="email" className="form-control" component={InputField} type="email" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field name="password" className="form-control" component={InputField} type="password" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <div className="mt-3">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </form>
    );
  }
}

function validate(values) {  
  const errors = {};

  if (!values.name) {
    errors.name = 'Please enter a first name.';
  }

  if (values.name && values.name.length < 3) {
    errors.name = 'Name must be longer than 2 characters.';
  }

  if (values.name && values.name.length > 100) {
    errors.name = 'Name cannot be longer than 100 characters.';
  }

  if (!values.email) {
    errors.email = 'Please enter an email.';
  }

  if (values.email && values.email.length < 5) {
    errors.email = 'Email must be longer than 4 characters.';
  }

  if (values.email && values.email.length > 255) {
    errors.email = 'Email cannot be longer than 255 characters.';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  }

  if (values.password && values.password.length < 5) {
    errors.password = 'Password must be longer than 4 characters.';
  }

  if (values.password && values.password.length > 255) {
    errors.password = 'Password cannot be longer than 255 characters.';
  }

  return errors;
}

function mapStateToProps({ auth }) {
  return { error: auth.error };
}

Register = connect(mapStateToProps, { registerUser, loginUser, clearAuthError })(Register);  

export default reduxForm({
  form: 'register',
  validate
})(Register);