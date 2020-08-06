import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { updateActiveChannelID, updateChannels } from './features/channels/channelSlice';
import { updateMessages } from './features/messages/messageSlice';
import store from './store';
import { getUser } from './utils/getUser';
import eventListen from './utils/socket';

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

eventListen(store);

export default app;
