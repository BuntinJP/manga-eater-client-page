import React, { useEffect } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import * as utils from './utils';
import { useAppSelector, useAppDispatch } from '../store';
import { selectLoad, setLoad } from './LoadSlice';
import { selectChannel, setChannel } from './ChannelSlice';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const ChannelInfo: React.FC = () => {
  const channel = useAppSelector(selectChannel);
  const dispatch = useAppDispatch();
  useEffect(() => {
    utils.fetchChannelNames().then((channels) => {
      dispatch(setChannel(channels));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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
  );
};

const ChannelOps: React.FC = () => {
  const [checked, setChecked] = React.useState(false); //toggle button
  const channel = useAppSelector(selectChannel);
  const dispatch = useAppDispatch();
  const [id, setId] = React.useState<string>('');
  useEffect(() => {
    utils.fetchChannelNames().then((channels) => {
      dispatch(setChannel(channels));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeChannel = async (index: number) => {
    dispatch(setLoad(true));
    const dispatched = await utils.fetchChannelChange(index);
    console.log(dispatched);
    dispatch(setChannel(dispatched));
    dispatch(setLoad(false));
  };
  const addChannel = async () => {
    dispatch(setLoad(true));
    const dispatched = await utils.fetchChannelAdd(id);
    console.log(dispatched);
    dispatch(setChannel(dispatched));
    dispatch(setLoad(false));
  };
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
        <Typography>追加する</Typography>
        <IOSSwitch
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
      </Stack>
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
      <br />
      <form>
        <div className="mb-3">
          <label htmlFor="channelID" className="form-label">
            ChannelID(数字のみ)
          </label>
          <input
            type="email"
            className="form-control"
            id="channelID"
            placeholder="ChannelID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={addChannel}>
          追加
        </button>
      </form>
    </>
  );
};

const ChannelCard: React.FC = () => {
  const ifload = useAppSelector(selectLoad);
  return (
    <>
      <br />
      <div className="card text-center bg-dark">
        <div className="card-header">
          <h5>Channel</h5>
        </div>
        <div className="card-body">
          {ifload ? (
            <Spinner animation="border" variant="Light" hidden={!ifload} />
          ) : (
            <ChannelInfo />
          )}
        </div>
        <ChannelOps />
        <div className="card-footer text-muted">{/* textalign left */}</div>
      </div>
      <br />
    </>
  );
};

export default ChannelCard;
