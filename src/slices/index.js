import { combineReducers } from 'redux';
import channelReducer from './channelSlice';
import messageReducer from './messageSlice';
import modalReducer from './modalSlice';
import alertReducer from './alertSlice';

const rootReducer = combineReducers({
  chat: channelReducer,
  messages: messageReducer,
  modal: modalReducer,
  alerts: alertReducer
});

export default rootReducer;
