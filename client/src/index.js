import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);

registerServiceWorker();
