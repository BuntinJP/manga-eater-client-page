//mock redux store
// Path: src/Components/TestSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
const initialState = {
  test: 'test',
  ifbool: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeTest(state, action: { payload: string }) {
      state.test = action.payload;
    },
    changeBool(state, action: { payload: boolean }) {
      state.ifbool = action.payload;
    },
  },
});

//selector
export const selectTest = (state: RootState) => state.test;

export const { changeTest, changeBool } = testSlice.actions;

export default testSlice.reducer;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
