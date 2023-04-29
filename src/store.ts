import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import testReducer from './Components/TestSlice';
import DirectorySlice from './Components/DirectorySlice';
import TreeSlice from './Components/TreeSlice';
export const store = configureStore({
  reducer: {
    test: testReducer,
    directory: DirectorySlice,
    tree: TreeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
