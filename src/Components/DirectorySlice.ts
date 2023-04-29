import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArchiveState } from './types';

const initialState: ArchiveState[] = [];

const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    addDirectory(state, action: PayloadAction<ArchiveState>) {
      state.push(action.payload);
    },
    removeDirectory(state, action: PayloadAction<ArchiveState>) {
      const index = state.findIndex(
        (directory) => directory.title === action.payload.title
      );
      state.splice(index, 1);
    },
    editDirectory(state, action: PayloadAction<ArchiveState>) {
      const index = state.findIndex(
        (directory) => directory.title === action.payload.title
      );
      state[index] = action.payload;
    },
  },
});

export const { addDirectory, removeDirectory, editDirectory } =
  directorySlice.actions;

export default directorySlice.reducer;
