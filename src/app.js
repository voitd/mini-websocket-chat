import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import App from './components/App';
import {
  createChannelSuccess,
  removeChannelSuccess,
  renameChannelSuccess,
  updateActiveChannelID,
  updateChannels
} from './features/channels/channelSlice';
import { createNewMessageSuccess, updateMessages } from './features/messages/messageSlice';
import rootReducer from './reducers';
import { getUser } from './utils/getUser';

export const UserContext = React.createContext({ name: 'Guess' });

const app = ({ channels, currentChannelId, messages }) => {
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();

  /* eslint-enable */

  const store = configureStore({ reducer: rootReducer, devtoolMiddleware });

  store.dispatch(updateChannels(channels));
  store.dispatch(updateActiveChannelID(currentChannelId));
  store.dispatch(updateMessages(messages));

  const socket = io();

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(createNewMessageSuccess(attributes));
  });

  socket.on('newChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(createChannelSuccess(attributes));
  });

  socket.on('renameChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(renameChannelSuccess(attributes));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(removeChannelSuccess(data));
  });

  const user = getUser();

  render(
    <Provider store={store}>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>{' '}
    </Provider>,
    document.getElementById('chat')
  );
};

export default app;
