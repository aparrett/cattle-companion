import React from 'react';
import { connect } from 'react-redux';
import { dismissError } from '../actions/error';
import { Link } from 'react-router-dom';

const Header = props => {
  function handleDismissClick() {
    props.dismissError();
  }

  function renderError() {
    if (props.error) {
      return (
        <div>
          <div className="alert-danger">
            { props.error }
          </div>
          <button onClick={handleDismissClick.bind(this)}>Dismiss</button>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="d-flex p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <div className="container">
          <div className="text-center">
            <Link className="logo" to="/">Cattle Companion</Link>
          </div>
          {props.authenticated &&
            <nav className="text-center">
              <Link className="mr-2" to="/">Farms</Link>
              <Link to="/login">Logout</Link>
            </nav>
          }
        </div>
      </div>
      { renderError() }
    </div>
  );
}

function mapStateToProps({ error, auth: { authenticated } }) {
  return { error, authenticated };
}

export default connect(mapStateToProps, { dismissError })(Header);