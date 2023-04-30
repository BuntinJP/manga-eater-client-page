import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ChannelInfo } from './types';

const initialState: ChannelInfo = {
  currentName: '',
  alt: [],
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannel(state, action: PayloadAction<ChannelInfo>) {
      state.currentName = action.payload.currentName;
      state.alt = action.payload.alt;
    },
  },
});

export const selectChannel = (state: RootState) => state.channel;

export const { setChannel } = channelSlice.actions;

export default channelSlice.reducer;
