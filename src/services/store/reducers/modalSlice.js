import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  modal: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    OPEN_MODAL: (state, action) => {
      state.isVisible = true;
      state.modal = action.payload;
    },
    CLOSE_MODAL: (state) => {
      state.modal = '';
      state.isVisible = false;
    },
  },
});

export const { OPEN_MODAL, CLOSE_MODAL } = modalSlice.actions;

export default modalSlice.reducer;
