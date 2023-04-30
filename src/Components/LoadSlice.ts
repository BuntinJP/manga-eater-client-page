import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

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

export const selectLoad = (state: RootState) => state.load.load;

export const { setLoad } = loadSlice.actions;

export default loadSlice.reducer;
