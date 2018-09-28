import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';
import { logoutUser } from '../actions/auth';

export const Header = ({ authenticated, logoutUser, history }) => (
  <div>
    <div className="d-flex p-3 px-md-4 bg-white border-bottom box-shadow">
      <div className="container">
        <div className="text-center">
          <Link className="logo" to="/">
            Cattle Companion
          </Link>
        </div>
        {authenticated && (
          <nav data-test="auth-nav" className="text-center">
            <Link className="mr-2" to="/">
              Farms
            </Link>
            <a data-test="logout" onClick={() => logoutUser(history)}>
              Logout
            </a>
          </nav>
        )}
      </div>
    </div>
    <ErrorAlert />
  </div>
);

function mapStateToProps({ auth: { authenticated } }) {
  return { authenticated };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Header)
);
