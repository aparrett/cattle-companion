import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import HomePage from './HomePage';
import FarmDetailsPage from './FarmDetailsPage';
import CowDetailsPage from './CowDetailsPage';
import CowCreatePage from './CowCreatePage';
import CowEditPage from './CowEditPage';
import NotFoundPage from './NotFoundPage';

const Router = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <PrivateRoute exact path="/" component={HomePage} />
    <PrivateRoute exact path="/farms/:id" component={FarmDetailsPage} />
    <PrivateRoute exact path="/farms/:farmId/cattle/new" component={CowCreatePage} />
    <PrivateRoute exact path="/farms/:farmId/cattle/:id" component={CowDetailsPage} />
    <PrivateRoute exact path="/farms/:farmId/cattle/:id/edit" component={CowEditPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Router;
