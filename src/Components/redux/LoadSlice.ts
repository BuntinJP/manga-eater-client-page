import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  load: false,
};

const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    setLoad(state, action: PayloadAction<boolean>) {
      state.load = action.payload;
    },
  },
});

export const { setLoad } = loadSlice.actions;

export default loadSlice.reducer;
