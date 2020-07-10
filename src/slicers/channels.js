import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channels: [],
    currentChannelId: 1
  },
  reducers: {
    addChannel: {
      prepare(name) {
        const id = `id${uniqueId()}`;
        return { payload: { id, name, removable: true } };
      },
      reducer(state, action) {
        const { id, name, removable } = action.payload;
        state.push({ id, name, removable });
      }
    }
    // toggleChannel: {
    //   prepare(id) {},
    //   reducer(state, action) {}
    // }
  }
});

export const { addChannel, toggleChannel } = channelSlice.actions;

export default channelSlice.reducer;
