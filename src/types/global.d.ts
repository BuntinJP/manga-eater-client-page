interface Archive {
  title: string;
  episodes: string[];
}
interface ArchiveState extends Archive {
  checkedEpisodes: number[];
  // check episodes index
}

interface DirectoryOutbound {
  //(GET /directory Response)
  titles: string[];
  outbound: Archive[];
}
interface ChannelInfo {
  currentName: string;
  alt?: string[];
}

interface Checked {
  index: number;
  checked: number[];
}

interface TreeState {
  nodes: Node[];
  filterd: Node[];
  checked: string[];
  expanded: string[];
}

interface Alert {
  message: string;
  show: boolean;
}

interface Jobs {
  id: string;
  title?: string;
  progress?: number; // 0-100
}

interface ServerStatus {
  state: 'idle' | 'busy' | 'error';
  message: string;
  jobs?: Jobs[];
}
