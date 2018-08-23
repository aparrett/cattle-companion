import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from './Header';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container body-content">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Home} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;