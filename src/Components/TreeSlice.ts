import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Node } from 'react-checkbox-tree';

interface TreeState {
  nodes: Node[];
  filterd: Node[];
  checked: string[];
  expanded: string[];
}
const initialState: TreeState = {
  nodes: [],
  filterd: [],
  checked: [],
  expanded: [],
};

const treeSlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    initTree(state, action: PayloadAction<Node[]>) {
      state.filterd = action.payload;
      state.nodes = action.payload;
    },
    setTree(state, action: PayloadAction<TreeState>) {
      state.filterd = action.payload.filterd;
      state.checked = action.payload.checked;
      state.expanded = action.payload.expanded;
    },
    setFilterd(state, action: PayloadAction<Node[]>) {
      state.filterd = action.payload;
    },
    setChecked(state, action: PayloadAction<string[]>) {
      state.checked = action.payload;
    },
    setExpanded(state, action: PayloadAction<string[]>) {
      state.expanded = action.payload;
    },
  },
});

//selector
export const selectTree = (state: RootState) => state.tree;

export const { initTree, setTree, setChecked, setExpanded, setFilterd } =
  treeSlice.actions;

export default treeSlice.reducer;
