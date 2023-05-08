import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ServerStatus {
  state: 'idle' | 'busy' | 'error';
  message: string;
}
const initialState: ServerStatus = {
  state: 'idle',
  message: 'inited',
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setServerStatus: (state, action: PayloadAction<ServerStatus>) => {
      state.state = action.payload.state;
      state.message = action.payload.message;
    },
  },
});

export const selectServerStatus = (state: RootState) => state.webSocket;

export const { setServerStatus } = webSocketSlice.actions;

export default webSocketSlice.reducer;
