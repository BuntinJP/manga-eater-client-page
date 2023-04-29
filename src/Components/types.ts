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
