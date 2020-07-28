import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './features/channels/channelSlice';
import messageReducer from './features/messages/messageSlice';
import modalReducer from './features/modals/modalSlice';
import alertReducer from './features/alerts/errorsSlice';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

/* eslint-enable */

const store = configureStore({
  reducer: {
    chat: channelReducer,
    messages: messageReducer,
    modal: modalReducer,
    alerts: alertReducer
  },
  devtoolMiddleware
});

export default store;
