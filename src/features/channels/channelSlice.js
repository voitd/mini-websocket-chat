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
  const { data } = await axios.patch(routes.channelPath(id), body);
  return data;
});

export const removeChannel = createAsyncThunk('chat/removeChannel', async (id) => {
  const body = { data: { id } };
  const response = await axios.delete(routes.channelPath(id), body);
  return response.data;
});

const initialState = {
  channels: [],
  currentChannelId: 1,
  isLoading: false,
  error: false
};

const channelSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateChannels(state, { payload }) {
      if (!payload) return;
      state.channels = state.channels.concat(payload);
    },
    updateActiveChannelID(state, action) {
      state.currentChannelId = action.payload;
    }
  },
  extraReducers: {
    [createChannel.pending]: (state) => {
      state.isLoading = true;
    },
    [createChannel.fulfilled]: (state) => {
      state.isLoading = false;
      state.error = false;
    },
    [createChannel.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    [renameChannel.pending]: (state) => {
      state.isLoading = true;
    },
    [renameChannel.fulfilled]: (state, { payload }) => {
      const { name, id } = payload.data.attributes;
      const channel = state.channels.find((chnl) => chnl.id === id);
      channel.name = name;
      state.isLoading = false;
      state.error = false;
    },
    [renameChannel.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    [removeChannel.pending]: (state) => {
      state.isLoading = true;
    },
    [removeChannel.fulfilled]: (state, { meta }) => {
      const id = meta.arg;
      state.channels = state.channels.filter((chnl) => chnl.id !== id);
      state.currentChannelId = initialState.currentChannelId;
      state.isLoading = false;
      state.error = false;
    },
    [removeChannel.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    }
  }
});

export default channelSlice.reducer;
export const {
  updateChannels,
  updateActiveChannelID,
  createChannelSuccess,
  editChannelSuccess,
  deleteChannelSuccess
} = channelSlice.actions;

export const selectChannel = (state) => state.chat.channels;
export const selectChannelId = (state) => state.chat.currentChannelId;
export const selectChannelError = (state) => state.chat.error;
export const selectChannelIsLoading = (state) => state.chat.isLoading;
