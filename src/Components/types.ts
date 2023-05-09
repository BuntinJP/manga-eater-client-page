export interface Archive {
  title: string;
  episodes: string[];
}
export interface ArchiveState extends Archive {
  checkedEpisodes: number[];
  // check episodes index
}

export interface DirectoryOutbound {
  //(GET /directory Response)
  titles: string[];
  outbound: Archive[];
}
export interface ChannelInfo {
  currentName: string;
  alt?: string[];
}

export interface Checked {
  index: number;
  checked: number[];
}

export interface TreeState {
  nodes: Node[];
  filterd: Node[];
  checked: string[];
  expanded: string[];
}

export interface Alert {
  message: string;
  show: boolean;
}

interface Jobs {
  id: string;
  title?: string;
  progress?: number; // 0-100
}

export interface ServerStatus {
  state: 'idle' | 'busy' | 'error';
  message: string;
  jobs?: Jobs[];
}
