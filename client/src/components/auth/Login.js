import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, logoutUser } from '../../actions/auth';
import InputField from '../fields/InputField';

class Login extends Component {
  componentDidMount() {
    if (this.props.authenticated) { 
      this.props.logoutUser();
    }
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps, () => window.location.href = '/');
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {error && <div className="error">{error}</div>}
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
        <button type="submit" className="btn btn-primary">Login</button>
        <div>Not signed up? <Link to="/register">Register</Link></div>
      </form>
    );
  }
}

function validate(values) {  
  const errors = {};

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
  return { error: auth.error, authenticated: auth.authenticated };
}

Login = connect(mapStateToProps, { loginUser, logoutUser })(Login);  

export default reduxForm({
  form: 'login',
  validate
})(Login);