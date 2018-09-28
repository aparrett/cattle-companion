import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, clearAuthError } from '../../actions/auth';
import InputField from '../fields/InputField';
import validate from '../../validation/validateLogin';
import { mergeProps } from '../../utils/redux';

export class LoginPage extends Component {
  componentDidMount() {
    this.props.clearAuthError();
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps, () => this.props.history.push('/'));
  }

  handleGuestClick() {
    const guestUser = { email: 'guest@test.com', password: 'password' };
    this.props.loginUser(guestUser, () => this.props.history.push('/'));
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="mb-2">
          Taking the app for a spin? Click&nbsp;
          <a data-test="guest" onClick={this.handleGuestClick.bind(this)}>
            here
          </a>
          &nbsp;to login as a guest.
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

const mapStateToProps = ({ auth }) => ({ error: auth.error, authenticated: auth.authenticated });

const ConnectedLoginPage = connect(
  mapStateToProps,
  { loginUser, clearAuthError },
  mergeProps
)(LoginPage);

export default reduxForm({
  form: 'login',
  validate
})(ConnectedLoginPage);
