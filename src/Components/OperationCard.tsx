import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store';
import { selectLoad, setLoad } from './LoadSlice';
import { selectTree } from './TreeSlice';
import { pushDirData } from './utils';
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
    dispatch(setLoad(!ifloading));
  };
  const push = () => {
    dispatch(setLoad(true));
    const checked = tree.checked;
    let pushList: Checked[] = [];
    for (let i = 0; i < checked.length; i++) {
      const t = checked[i].split(' ');
      const index = parseInt(t[0]);
      const episode = parseInt(t[1]);
      let listIndex = -1;
      if (!checkIndex(index, pushList)) {
        pushList.push({ index: index, checked: [] });
        listIndex = pushList.length - 1;
      }
      listIndex = indexOf(index, pushList);
      pushList[listIndex].checked.push(episode);
    }
    pushDirData(pushList).then((res) => {
      console.log(res);
      dispatch(setLoad(false));
    });
  };
  return (
    <div className="card text-center bg-dark">
      <div className="card-header">
        <h5>Operation</h5>
      </div>
      <div className="card-body">
        <Button variant="light" onClick={push}>
          ALL Push
        </Button>
        {'  '}
        <Button variant="light" onClick={check}>
          Check
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
      </div>
    </div>
  );
};

export default OperationCard;
