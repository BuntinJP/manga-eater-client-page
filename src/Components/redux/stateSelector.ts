import { RootState } from '../../store';

export const selectChannel = (state: RootState) => state.channel;
export const selectAlert = (state: RootState) => state.alert;
export const selectDirectory = (state: RootState) => state.directory;
export const selectLoad = (state: RootState) => state.load.load;
export const selectTree = (state: RootState) => state.tree;
export const selectServerStatus = (state: RootState) => state.webSocket;
