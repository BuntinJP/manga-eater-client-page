import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ArchiveState[] = [];

const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    init(state, action: PayloadAction<ArchiveState[]>) {
      state = action.payload;
    },
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

export const { init, addDirectory, removeDirectory, editDirectory } =
  directorySlice.actions;

export default directorySlice.reducer;
