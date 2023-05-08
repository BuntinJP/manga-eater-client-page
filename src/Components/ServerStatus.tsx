import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import {
  setServerStatus,
  selectServerStatus,
  ServerStatus,
} from './webSocketSlice';
import * as utils from './utils';
import { Table, Container } from 'react-bootstrap';

const ServerStatusComp: React.FC = () => {
  const dispatch = useDispatch();
  const serverStatus = useSelector(selectServerStatus);
  let socket: Socket;
  const url = utils.url;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    socket = io(url);
    socket.on('connect', () => {
      console.log('Successfully connected to server websocket');
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
    <Container>
      <h4>Server Status</h4>
      <Table className="table-dark">
        <thead>
          <tr>
            <th>state</th>
            <th>message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{serverStatus.state}</td>
            <td>{serverStatus.message}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ServerStatusComp;
