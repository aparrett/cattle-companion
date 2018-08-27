import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => {      
        if (rest.authenticated){
          return <Component {...props} />;
        } else {
          rest.fetchUser(() => window.location.href = '/login');
          return <div />;
        }
      }
    }
  />
);

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, { fetchUser })(PrivateRoute);
