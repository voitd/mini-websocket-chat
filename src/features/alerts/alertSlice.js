import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    isLoading: false,
    error: false
  },
  reducers: {
    createError(state, { payload }) {
      state.error = payload;
    },
    toggleLoadingState(state, { payload }) {
      state.isLoading = payload;
    },
    clearError(state) {
      state.isLoading = false;
      state.error = false;
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

export const selectError = (state) => state.alerts.error;
export const selectLoadingState = (state) => state.alerts.isLoading;
export const selectShowStatus = (state) => !!state.alerts.error || state.alerts.isLoading;

export const { createError, clearError, toggleLoadingState } = alertSlice.actions;
export default alertSlice.reducer;
