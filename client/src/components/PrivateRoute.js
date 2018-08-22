import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => {
        if (rest.auth){
          return <Component {...props} />;
        } else {
          // If error in fetchUser, user will be redirected to login page.
          rest.fetchUser(() => window.location.href = '/login');
          return <Component {...props} />;
        }
      }
    }
  />
)

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps, { fetchUser })(PrivateRoute);
