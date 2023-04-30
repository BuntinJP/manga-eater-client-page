import React, { useEffect } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import * as utils from './utils';
import { useAppSelector, useAppDispatch } from '../store';
import { selectLoad, setLoad } from './LoadSlice';
import { selectChannel, setChannel } from './ChannelSlice';

const ChannelCard: React.FC = () => {
  const channel = useAppSelector(selectChannel);
  const dispatch = useAppDispatch();
  const ifload = useAppSelector(selectLoad);
  useEffect(() => {
    utils.fetchChannelNames().then((channels) => {
      dispatch(setChannel(channels));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeChannel = async (index: number) => {
    dispatch(setLoad(true));
    const dispatched = await utils.fetchChannelChange(index);
    dispatch(setChannel(dispatched));
    dispatch(setLoad(false));
  };
  return (
    <>
      <br />
      <div className="card text-center bg-dark">
        <div className="card-header">
          <h5>
            Channel
            <Spinner animation="border" variant="Light" hidden={!ifload} />
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
