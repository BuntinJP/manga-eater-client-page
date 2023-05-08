import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import {
  setServerStatus,
  selectServerStatus,
  ServerStatus,
} from './webSocketSlice';
import * as utils from './utils';

const WebSocketComponent: React.FC = () => {
  const dispatch = useDispatch();
  const serverStatus = useSelector(selectServerStatus);
  let socket: Socket;
  const url = utils.url + '/status';
  socket = io(url);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('client is successfully connected for The Depl Server.');
    });
    socket.on('status', (status: { state: string; message: string }) => {
      const parsed = status as ServerStatus;
      dispatch(setServerStatus(parsed));
    });

    socket.on('disconnect', () => {
      setServerStatus({
        state: 'error',
        message: 'server not found. or disconnected.',
      });
    });

    return () => {
      socket.off('connect');
      socket.off('status');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      <h3>WebSocket Status:</h3>
      <p>State: {serverStatus.state}</p>
      <p>Message: {serverStatus.message}</p>
    </div>
  );
};

export default WebSocketComponent;
