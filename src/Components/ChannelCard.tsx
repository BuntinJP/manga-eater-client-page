import React, { useEffect, useState } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';

interface ChannelInfo {
  currentName: string;
  alt?: string[];
}

interface Props {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetchChannelNames = async () => {
  const name = await fetch('http://localhost:3000/channel');
  return await name.json();
};

const ChannelCard: React.FC<Props> = (prop) => {
  const [channel, setChannel] = useState<ChannelInfo>({
    currentName: '未取得',
  }); //discordチャンネル名
  useEffect(() => {
    fetchChannelNames().then((channels) => {
      console.log('fetchChannelNames was called');
      console.log(`setChannel was called with ${channels.currentName}`);
      console.log(channels);
      setChannel(channels);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeChannel = async (index: number) => {
    prop.setLoading(true);
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
    console.log(result);
    setChannel(result);
    prop.setLoading(false);
  };
  return (
    <>
      <div className="card text-center bg-dark">
        <div className="card-header">
          <h5>
            Discord Channel
            <Spinner
              animation="border"
              variant="Light"
              hidden={!prop.isLoading}
            />
          </h5>
        </div>
        <div className="card-body">
          <table className="table table-dark table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">channel名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">現在</th>
                <td>{channel.currentName}</td>
              </tr>
              <tr>
                <th scope="row">候補</th>
                <td>
                  {/* TODO 表示内容を表に敷き詰める */}
                  {channel.alt?.map((alt, index) => {
                    return index < 3 ? <div key={index}>{alt}</div> : null;
                  })}
                </td>
              </tr>
            </tbody>
          </table>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              チャンネルを変更
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {channel.alt?.map((alt, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      changeChannel(index);
                    }}
                  >
                    {alt}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ChannelCard;
