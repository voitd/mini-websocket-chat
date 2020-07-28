import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const channels = handleActions(
  {
    [actions.toggleActiveChannel](state, { payload: { id } }) {
      return { channels, currentChannelId: id };
    }
  },
  { channels: [], currentChannelId: 0 }
);
const messages = handleActions(
  {
    [actions.toggleActiveChannel](state, payload) {}
  },
  {}
);
export default combineReducers({
  channels,
  messages
});
