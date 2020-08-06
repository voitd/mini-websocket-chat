import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { updateActiveChannelID, updateChannels } from './features/channels/channelSlice';
import { updateMessages } from './features/messages/messageSlice';
import rootReducer from './reducers';
import { getUser } from './utils/getUser';
import listenEvents from './utils/socket';

export const UserContext = React.createContext({ name: 'Guess' });

const app = ({ channels, currentChannelId, messages }) => {
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();

  /* eslint-enable */

  const store = configureStore({
    reducer: rootReducer,
    devtoolMiddleware
  });

  store.dispatch(updateChannels(channels));
  store.dispatch(updateActiveChannelID(currentChannelId));
  store.dispatch(updateMessages(messages));

  listenEvents(store);

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

export default app;
