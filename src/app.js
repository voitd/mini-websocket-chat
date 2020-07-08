import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducers from './reducers/index.js';
import App from './components/App';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

/* eslint-enable */

export default (gon) => {
  // const store = createStore(reducers, gon, devtoolMiddleware);

  render(
    // <Provider store={store}>
    <App channels={gon.channels} currentChannelId={gon.currentChannelId} messages={gon.messages} />,
    /* </Provider>, */
    document.getElementById('chat')
  );
};
