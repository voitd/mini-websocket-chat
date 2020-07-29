import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import socket from './utils/socket';
import getUser from './utils/user';
import App from './components/App';
import { updateMessages } from './features/messages/messageSlice';
import { updateChannels, updateActiveChannelID } from './features/channels/channelSlice';

export const UserContext = React.createContext({ name: 'Guess' });

const app = ({ channels, currentChannelId, messages }) => {
  store.dispatch(updateChannels(channels));
  store.dispatch(updateActiveChannelID(currentChannelId));
  store.dispatch(updateMessages(messages));

  const user = getUser();

  render(
    <Provider store={store}>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat')
  );
};

socket();

export default app;
