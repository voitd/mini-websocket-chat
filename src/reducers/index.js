import { combineReducers } from 'redux';
import channelReducer from '../features/channels/channelSlice';
import messageReducer from '../features/messages/messageSlice';
import modalReducer from '../features/modals/modalSlice';
import alertReducer from '../features/alerts/alertSlice';

const rootReducer = combineReducers({
  chat: channelReducer,
  messages: messageReducer,
  modal: modalReducer,
  alerts: alertReducer
});

export default rootReducer;
