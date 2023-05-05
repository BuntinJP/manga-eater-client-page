import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Alert } from './types';

const initialState: Alert = {
  message: '変なこといれてんじゃねえよカスが',
  show: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const selectAlert = (state: RootState) => state.alert;

export const { setMessage, setShow } = alertSlice.actions;

export default alertSlice.reducer;
