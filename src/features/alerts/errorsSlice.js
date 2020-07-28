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
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    }
  }
});

export const { createError, clearError } = alertSlice.actions;
export const selectLoadingState = (state) => state.alerts.isLoading;
export const selectError = (state) => state.alerts.error;
export default alertSlice.reducer;
