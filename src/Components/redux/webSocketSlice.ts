import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ServerStatus = {
  state: 'idle',
  message: 'inited',
  jobs: [],
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setServerStatus: (state, action: PayloadAction<ServerStatus>) => {
      state.state = action.payload.state;
      state.message = action.payload.message;
      state.jobs = action.payload.jobs;
    },
  },
});

export const { setServerStatus } = webSocketSlice.actions;

export default webSocketSlice.reducer;
