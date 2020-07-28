import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    procces: 'adding',
    isShow: false
  },
  reducers: {
    showModal: (state, action) => {
      state.procces = action.payload;
      state.isShow = true;
    },
    hideModal: (state, action) => {
      state.isShow = false;
    }
  }
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;

export const selectModalStatus = (state) => state.modal.isShow;
export const selectModalType = (state) => state.modal.procces;
