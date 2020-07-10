import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes.js';

export const toggleActiveChannel = createAction('TOGGLE_CHANNEL');
export const addChannel = createAction('CHANNEL_ADD');

export const addNewMessagesRequest = createAction('ADD_NEW_MESSAGE_REQUEST');
export const addNewMessagesSuccess = createAction('ADD_NEW_MESSAGE_SUCCESS');
export const addNewMessagesFailure = createAction('ADD_NEW_MESSAGE_FAILURE');

export const addMessage = ({ id, text }) => async (dispatch) => {
  const response = await axios.post(routes.channelMessagesPath(id), { text });
  console.log('addMessage -> response', response.data);
  dispatch(addNewMessagesSuccess({ messages: response.data }));
};
