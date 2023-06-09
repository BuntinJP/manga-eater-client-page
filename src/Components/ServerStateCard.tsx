import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { setServerStatus, selectServerStatus } from './webSocketSlice';
import { ServerStatus } from './types';

import * as utils from './utils';
import { Table, Container, Card } from 'react-bootstrap';

const TaskCard: React.FC = () => {
  const serverStatus = useSelector(selectServerStatus);
  let jobs = serverStatus.jobs || [];
  //mock return
  if (jobs.length === 0) {
    return (
      <tr>
        <td>no jobs</td>
      </tr>
    );
  }
  return (
    <>
      {jobs.map((job, index) => {
        return (
          <tr key={index}>
            <td>{job.title || 'fetching...'}</td>
            <td>{job.progress?.toString() || 'fetching...'}</td>
          </tr>
        );
      })}
    </>
  );
};

const ServerStateCard: React.FC = () => {
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
    socket.on('status', (status: ServerStatus) => {
      console.log('status', status);
      dispatch(setServerStatus(status));
    });
    socket.on('disconnect', () => {
      setServerStatus({
        state: 'error',
        message: 'server not found. or disconnected.',
        jobs: [],
      });
    });
    return () => {
      socket.off('connect');
      socket.off('status');
      socket.off('disconnect');
    };
  }, []);
  return (
    <Card className="text-center bg-dark">
      <Card.Header>
        <h6>ServerStatus({serverStatus.state})</h6>
      </Card.Header>
      <Card.Body>
        <Container>
          <div className="badge text-wrap">{serverStatus.message}</div>
          <Table className="table-dark">
            <thead>
              <tr>
                <th>title</th>
                <th>progress</th>
              </tr>
            </thead>
            <tbody>
              <TaskCard />
            </tbody>
          </Table>
        </Container>
      </Card.Body>
      <Card.Footer />
    </Card>
  );
};

export default ServerStateCard;
