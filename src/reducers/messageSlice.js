import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes.js';

export const createNewMessage = createAsyncThunk('messages/createNewMessage', async (message) => {
  const body = { data: { attributes: message } };
  const { data } = await axios.post(routes.channelMessagesPath(message.channelId), body);
  return data.attributes;
});

const { actions, reducer } = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    updateMessages(state, { payload }) {
      const reversedMessages = payload.reverse();
      state.push(...reversedMessages);
    },
    createNewMessageSuccess(state, { payload }) {
      state.unshift(payload);
    }
  },
  extraReducers: {
    'chat/removeChannel/fulfilled': (state, { meta }) => {
      const id = meta.arg;
      return state.filter((message) => message.channelId !== id);
    }
  }
});

export const { createNewMessageSuccess, updateMessages } = actions;

export default reducer;

export const selectMessages = (state) => state.messages;
