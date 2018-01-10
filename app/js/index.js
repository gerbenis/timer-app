import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../scss/main.scss';

const rootEl = document.getElementById('app');

ReactDOM.render(<App />, rootEl);
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
