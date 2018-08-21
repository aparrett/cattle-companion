import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from './Header';

const Home = () => <div>Hello World</div>;
const Login = () => <div>Login</div>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;