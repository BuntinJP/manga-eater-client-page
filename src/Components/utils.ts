import { ChannelInfo, DirectoryOutbound, Checked } from './types';

const url = 'http://localhost:3000';

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

export { fetchChannelNames, fetchChannelChange, fetchDirectory, pushDirData };
export type { ChannelInfo };
