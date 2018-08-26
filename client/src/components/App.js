import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from './Header';
import ModalRoot from './modals/ModalRoot';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import Farm from './Farm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <ModalRoot />
          <div className="container body-content">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/farms/:id" component={Farm} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;