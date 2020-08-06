import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import routes from '../../routes.js';

export const createNewMessage = createAsyncThunk('messages/createNewMessage', async (message) => {
  const body = { data: { attributes: message } };
  const { data } = await axios.post(routes.channelMessagesPath(message.channelId), body);
  return data.attributes;
});

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    updateMessages(state, { payload }) {
      state.push(...payload);
    },
    createNewMessageSuccess(state, { payload }) {
      state.push(payload);
    }
  },
  extraReducers: {
    'chat/removeChannel/fulfilled': (state, { meta }) => {
      const id = meta.arg;
      return state.filter((message) => message.channelId !== id);
    }
  }
});

export const { createNewMessageSuccess, updateMessages } = messageSlice.actions;

export default messageSlice.reducer;

export const selectMessages = (state) => state;
export const selectMessageById = (state, id) =>
  state.messages.filter((msg) => msg.channelId === id);
