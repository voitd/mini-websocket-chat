import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const addNewMessageState = handleActions(
  {
    [actions.addNewMessagesRequest]() {
      return 'requested';
    },
    [actions.addNewMessagesSuccess]() {
      return 'failed';
    },
    [actions.addNewMessagesFailure]() {
      return 'finished';
    }
  },
  'none'
);

const channels = handleActions(
  {
    [actions.addTaskSuccess](state, { payload: { text } }) {
      console.log('reducer -> state', state);
      return {
        text
      };
    },
    [actions.toggleActiveChannel](state, { payload: { id } }) {
      return { channels, currentChannelId: id, messages };
    }
  },
  { channels: [], currentChannelId: 0, messages: [] }
);
export default combineReducers({
  channels
});
