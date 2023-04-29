import { ChannelInfo, DirectoryOutbound } from './types';

const fetchChannelNames = async () => {
  const name = await fetch('http://localhost:3000/channel');
  const info = (await name.json()) as ChannelInfo;
  return info;
};

const fetchChannelChange = async (index: number) => {
  const res = await fetch('http://localhost:3000/channel', {
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
  const res = await fetch('http://localhost:3000/directory');
  const directory = (await res.json()) as DirectoryOutbound;
  return directory;
};

export { fetchChannelNames, fetchChannelChange, fetchDirectory };
export type { ChannelInfo };
