import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const createChannel = createAsyncThunk('chat/createChannel', async (name) => {
  const body = { data: { attributes: { name } } };
  const { data } = await axios.post(routes.channelsPath(), body);
  return data.attributes;
});

export const renameChannel = createAsyncThunk('chat/renameChannel', async ({ name, id }) => {
  const body = { data: { attributes: { name } } };
  const { data } = await axios.patch(routes.channelPath(id), body);
  return data.attributes;
});

export const removeChannel = createAsyncThunk('chat/removeChannel', async (id) => {
  const { data } = await axios.delete(routes.channelPath(id));
  return data.attributes;
});

const { actions, reducer } = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    currentChannelId: 1
  },
  reducers: {
    updateChannels(state, { payload }) {
      state.channels.push(...payload);
    },
    createChannelSuccess(state, { payload }) {
      state.channels.push(payload);
    },
    updateActiveChannelID(state, action) {
      state.currentChannelId = action.payload;
    },
    renameChannelSuccess(state, { payload }) {
      const { name, id } = payload;
      const activeChannel = state.channels.find((channel) => channel.id === id);
      activeChannel.name = name;
    },
    removeChannelSuccess(state, { payload }) {
      const { id } = payload;

      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = state.channels[0].id;
    }
  }
});

export default reducer;
export const {
  updateChannels,
  updateActiveChannelID,
  createChannelSuccess,
  renameChannelSuccess,
  removeChannelSuccess
} = actions;

export const selectChannel = (state) => state.chat.channels;
export const selectChannelId = (state) => state.chat.currentChannelId;
