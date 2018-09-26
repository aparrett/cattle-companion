import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, logoutUser, clearAuthError } from '../../actions/auth';
import InputField from '../fields/InputField';

class LoginPage extends Component {
  componentDidMount() {
    this.props.clearAuthError();

    if (this.props.authenticated) {
      this.props.logoutUser(this.props.history);
    }
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps, () => this.props.history.push('/'));
  }

  handleGuestClick() {
    this.props.loginUser({ email: 'guest@test.com', password: 'password' }, () =>
      this.props.history.push('/')
    );
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="mb-2">
          Taking the app for a spin? Click <a onClick={this.handleGuestClick.bind(this)}>here</a> to
          login as a guest.
        </div>
        {error && <div className="invalid-feedback mb-3">{error}</div>}
        <div className="row">
          <div className="col-md-12">
            <label>Email</label>
            <Field name="email" className="form-control" component={InputField} type="email" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field
              name="password"
              className="form-control"
              component={InputField}
              type="password"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <div className="mt-3">
          Not signed up? <Link to="/register">Register</Link>
        </div>
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

LoginPage = connect(
  mapStateToProps,
  { loginUser, logoutUser, clearAuthError }
)(LoginPage);

export default reduxForm({
  form: 'login',
  validate
})(LoginPage);
