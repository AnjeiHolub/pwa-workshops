import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import 'whatwg-fetch';
import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

if ('serviceWorker' in navigator) {
  const registration = runtime.register().catch(function (err) {
    console.log('O jejku nie działa')
  });
}

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

