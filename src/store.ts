import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import DirectorySlice from './Components/DirectorySlice';
import TreeSlice from './Components/TreeSlice';
import ChannelSlice from './Components/ChannelSlice';
import LoadSlice from './Components/LoadSlice';
import AlertSlice from './Components/AlertSlice';
export const store = configureStore({
  reducer: {
    directory: DirectorySlice,
    tree: TreeSlice,
    channel: ChannelSlice,
    load: LoadSlice,
    alert: AlertSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
