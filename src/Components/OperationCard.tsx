import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, Card } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store';
import { selectLoad, setLoad } from './LoadSlice';
import { selectTree } from './TreeSlice';
import { setShow } from './AlertSlice';
import * as utils from './utils';
import { Checked } from './types';

const checkIndex = (index: number, list: Checked[]) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].index === index) {
      return true;
    }
  }
  return false;
};

const indexOf = (index: number, list: Checked[]) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].index === index) {
      return i;
    }
  }
  return -1;
};

const OperationCard: React.FC = () => {
  const ifloading = useAppSelector(selectLoad);
  const dispatch = useAppDispatch();
  const tree = useAppSelector(selectTree);
  const check = () => {
    //check button clicked
    //dispatch(setLoad(!ifloading));
    dispatch(setShow(true));
  };
  const push = () => {
    dispatch(setLoad(true));
    const checked = tree.checked;
    let pushList = utils.convCheckList(checked);
    utils.pushDirData(pushList).then((res) => {
      console.log(res);
      dispatch(setLoad(false));
    });
  };
  const deleteOpen = () => {
    dispatch(setShow(true));
  };
  return (
    <Card className="text-center bg-dark">
      <Card.Header>
        <h5>Operation</h5>
      </Card.Header>
      <Card.Body>
        <Button variant="light" onClick={push}>
          ALL Push
        </Button>{' '}
        <Button variant="light" onClick={check}>
          Check
        </Button>{' '}
        <Button variant="light" onClick={deleteOpen}>
          Delete
        </Button>
        <br />
        <br />
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            チャンネルを変更
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
      <Card.Footer />
    </Card>
  );
};

export default OperationCard;
