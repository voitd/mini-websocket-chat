import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const createChannel = createAsyncThunk('chat/createChannel', async (name) => {
  const body = { data: { attributes: { name } } };
  const response = await axios.post(routes.channelsPath(), body);
  return response.data.attributes;
});

export const renameChannel = createAsyncThunk('chat/renameChannel', async ({ name, id }) => {
  const body = { data: { attributes: { name } } };
  const response = await axios.patch(routes.channelPath(id), body);
  return response.data.attributes;
});

export const removeChannel = createAsyncThunk('chat/removeChannel', async (id) => {
  const response = await axios.delete(routes.channelPath(id));
  return response.data.attributes;
});

const initialState = {
  channels: [],
  currentChannelId: 1
};

const channelSlice = createSlice({
  name: 'chat',
  initialState,
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
      const channel = state.channels.find((chnl) => chnl.id === id);
      channel.name = name;
    },
    removeChannelSuccess(state, { payload }) {
      const { id } = payload;
      state.channels = state.channels.filter((chnl) => chnl.id !== id);
      state.currentChannelId = initialState.currentChannelId;
    }
  }
});

export default channelSlice.reducer;
export const {
  updateChannels,
  updateActiveChannelID,
  createChannelSuccess,
  renameChannelSuccess,
  removeChannelSuccess
} = channelSlice.actions;

export const selectChannel = (state) => state.chat.channels;
export const selectChannelId = (state) => state.chat.currentChannelId;
