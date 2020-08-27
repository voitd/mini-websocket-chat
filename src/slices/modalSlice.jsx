import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'modal',
  initialState: {
    procces: 'adding',
    isShown: false
  },
  reducers: {
    showModal: (state, action) => {
      state.procces = action.payload;
      state.isShown = true;
    },
    hideModal: (state) => {
      state.isShown = false;
    }
  }
});

export default reducer;
export const { showModal, hideModal } = actions;

export const selectModalStatus = (state) => state.modal.isShown;
export const selectModalType = (state) => state.modal.procces;
