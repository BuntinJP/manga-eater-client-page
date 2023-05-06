import { ChannelInfo, DirectoryOutbound, Checked } from './types';

const url2 = 'http://localhost:11150';
const url = 'https://manga.buntin.xyz';

const getUrl = () => {
  return url;
};

const fetchChannelNames = async () => {
  const name = await fetch(`${url}/channel`);
  const info = (await name.json()) as ChannelInfo;
  return info;
};

const fetchChannelChange = async (index: number) => {
  const res = await fetch(`${url}/channel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index,
    }),
  });
  const result = await res.json();
  console.log('in fetchChannelChange', result);
  return result as ChannelInfo;
};
const fetchChannelAdd = async (channelID: string) => {
  const res = await fetch(`${url}/channel/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channelID,
    }),
  });
  const result = await res.json();
  return result as ChannelInfo;
};

const fetchDirectory = async () => {
  const res = await fetch(`${url}/directory`);
  const directory = (await res.json()) as DirectoryOutbound;
  return directory;
};

const pushDirData = async (data: Checked[]) => {
  fetch(`${url}/directory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const pushUrl = async (pushUrl: string, ifPush: boolean) => {
  fetch(`${url}/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: pushUrl, ifPush }),
  });
};

const trimZero = (str: string) => {
  while (str.startsWith('0')) {
    str = str.slice(1);
  }
  if (str.startsWith('.')) {
    str = '0' + str;
  }
  while (str.endsWith('0') && str.includes('.')) {
    str = str.slice(0, -1);
  }
  if (str.endsWith('.')) {
    str = str.slice(0, -1);
  }
  return str;
};

export {
  trimZero,
  pushUrl,
  fetchChannelNames,
  fetchChannelChange,
  fetchDirectory,
  pushDirData,
  getUrl,
  fetchChannelAdd,
};
export type { ChannelInfo };
