import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import DirectorySlice from './Components/redux/DirectorySlice';
import TreeSlice from './Components/redux/TreeSlice';
import ChannelSlice from './Components/redux/ChannelSlice';
import LoadSlice from './Components/redux/LoadSlice';
import AlertSlice from './Components/redux/AlertSlice';
import webSocketSlice from './Components/redux/webSocketSlice';
export const store = configureStore({
  reducer: {
    directory: DirectorySlice,
    tree: TreeSlice,
    channel: ChannelSlice,
    load: LoadSlice,
    alert: AlertSlice,
    webSocket: webSocketSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
