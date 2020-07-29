import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: false
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    createError(state, { payload }) {
      state.error = payload;
    },
    toggleLoadingState(state, { payload }) {
      state.isLoading = payload;
    },
    clearError(state) {
      state = initialState;
      // state.isLoading = initialState.isLoading;
      // state.error = initialState.error;
    }
  },
  extraReducers: {
    'chat/createChannel/pending': (state) => {
      state.isLoading = true;
    },
    'chat/createChannel/fulfilled': (state) => {
      state.isLoading = false;
      state.error = false;
    },
    'chat/createChannel/rejected': (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    'chat/renameChannel/pending': (state) => {
      state.isLoading = true;
    },
    'chat/renameChannel/fulfilled': (state) => {
      state.isLoading = false;
      state.error = false;
    },
    'chat/renameChannel/rejected': (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    'chat/removeChannel/pending': (state) => {
      state.isLoading = true;
    },
    'chat/removeChannel/fulfilled': (state) => {
      state.isLoading = false;
      state.error = false;
    },
    'chat/removeChannel/rejected': (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    'messages/createNewMessage/pending': (state) => {
      state.isLoading = true;
    },
    'messages/createNewMessage/fulfilled': (state) => {
      state.isLoading = false;
      state.error = false;
    },
    'messages/createNewMessage/rejected': (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    }
  }
});

export const selectLoadingState = (state) => state.alerts.isLoading;
export const selectError = (state) => state.alerts.error;

export const { createError, clearError, toggleLoadingState } = alertSlice.actions;
export default alertSlice.reducer;
