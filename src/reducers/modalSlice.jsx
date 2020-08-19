import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'modal',
  initialState: {
    procces: 'adding',
    show: false
  },
  reducers: {
    showModal: (state, action) => {
      state.procces = action.payload;
      state.show = true;
    },
    hideModal: (state) => {
      state.show = false;
    }
  }
});

export default reducer;
export const { showModal, hideModal } = actions;

export const selectModalStatus = (state) => state.modal.show;
export const selectModalType = (state) => state.modal.procces;
