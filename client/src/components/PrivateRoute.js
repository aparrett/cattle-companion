import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => {   
        rest.fetchUser(props.history);

        if (rest.authenticated){
          return <Component {...props} />;
        }
        return <div />;
      }
    }
  />
);

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, { fetchUser })(PrivateRoute);
