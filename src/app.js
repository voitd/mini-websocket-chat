import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
<<<<<<< Updated upstream
import reducers from './reducers/index.js';
import App from './components/App';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
=======
import store from './store';
import socket from './socket';
import getUser from './utils/user';
import App from './components/App';
import { updateMessages } from './features/messages/messageSlice';
import { updateChannels, updateActiveChannelID } from './features/channels/channelSlice';

export const UserContext = React.createContext({ name: 'Guess' });
>>>>>>> Stashed changes

const app = ({ channels, currentChannelId, messages }) => {
  store.dispatch(updateChannels(channels));
  store.dispatch(updateActiveChannelID(currentChannelId));
  store.dispatch(updateMessages(messages));

<<<<<<< Updated upstream
export default (gon) => {
  // const store = createStore(reducers, gon, devtoolMiddleware);

  render(
    // <Provider store={store}>
    <App channels={gon.channels} currentChannelId={gon.currentChannelId} messages={gon.messages} />,
    /* </Provider>, */
=======
  const user = getUser();
  render(
    <Provider store={store}>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </Provider>,
>>>>>>> Stashed changes
    document.getElementById('chat')
  );
};
export default app;
