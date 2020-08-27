import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

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
    'chat/removeChannelSuccess': (state, { payload }) => {
      const { id } = payload;
      return state.filter((message) => message.channelId !== id);
    }
  }
});

export default reducer;
export const { createNewMessageSuccess, updateMessages } = actions;

export const selectMessages = (state) => state.messages;
