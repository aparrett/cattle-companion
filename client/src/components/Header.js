import React from 'react';
import Logout from './auth/Logout';
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
      <Link to="/">Cattle Companion</Link>
      <Logout />
      { renderError() }
    </div>
  );
}

function mapStateToProps({ error }) {
  return { error };
}

export default connect(mapStateToProps, { dismissError })(Header);