import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Logout extends Component {
  render() {
    return (
      this.props.authenticated
        ? <Link to="/login">Logout</Link>
        : <div />
    );
  }
}

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps)(Logout);