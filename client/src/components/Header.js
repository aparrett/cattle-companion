import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';

const Header = ({ authenticated }) => {
  return (
    <div>
      <div className="d-flex p-3 px-md-4 bg-white border-bottom box-shadow">
        <div className="container">
          <div className="text-center">
            <Link className="logo" to="/">
              Cattle Companion
            </Link>
          </div>
          {authenticated && (
            <nav className="text-center">
              <Link className="mr-2" to="/">
                Farms
              </Link>
              <Link to="/login">Logout</Link>
            </nav>
          )}
        </div>
      </div>
      <ErrorAlert />
    </div>
  );
};

function mapStateToProps({ auth: { authenticated } }) {
  return { authenticated };
}

export default connect(mapStateToProps)(Header);
