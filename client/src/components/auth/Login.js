import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <p>Login Dummy Text</p>
      <Link to={'/register'}>
        Register
      </Link>
    </div>
  );
};

export default Login;
