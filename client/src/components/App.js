import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';
import ModalRoot from './modals/ModalRoot';
import Router from './Router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt);
library.add(faPencilAlt);


const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <ModalRoot />
      <div className="container body-content">
        <Router />
      </div>
    </div>
  </BrowserRouter>
);

export default App;