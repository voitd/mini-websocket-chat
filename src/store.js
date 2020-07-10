import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slicers/channels';

const store = configureStore({
  reducer: {
    channels: channelsReducer
  }
});

export default store;
