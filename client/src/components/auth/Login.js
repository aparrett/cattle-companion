import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/auth';

const Login = (props) => {
  if (props.auth) {
    return <Redirect to="/" />;
  } else {
    props.fetchUser();
  }
  
  return (
    <div>
      <p>Login Dummy Text</p>
      <Link to={'/register'}>
        Register
      </Link>
    </div>
  );
};

function mapStateToProps(state) {
  console.log('state', state);
  return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps, { fetchUser })(Login);