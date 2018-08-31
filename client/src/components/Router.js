import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import Farm from './Farm';
import Cow from './Cow';
import CowCreateForm from './CowCreateForm';
import CowEditForm from './CowEditForm';
import Page404 from './Page404';

const Router = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/farms/:id" component={Farm} />
    <PrivateRoute exact path="/farms/:farmId/cattle/new" component={CowCreateForm} />
    <PrivateRoute exact path="/farms/:farmId/cattle/:id" component={Cow} />
    <PrivateRoute exact path="/farms/:farmId/cattle/:id/edit" component={CowEditForm} />
    <Route component={Page404} />
  </Switch>
);

export default Router;