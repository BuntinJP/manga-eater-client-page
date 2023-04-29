//mock redux store
// Path: src/Components/TestSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
const initialState = {
  test: 'test',
  ifbool: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeTest(state, action) {
      state.test = action.payload;
    },
    changeBool(state, action) {
      state.ifbool = action.payload;
    },
  },
});

//selector
export const selectTest = (state: RootState) => state.test.test;
export const selectBool = (state: RootState) => state.test.ifbool;

export const { changeTest, changeBool } = testSlice.actions;

export default testSlice.reducer;
