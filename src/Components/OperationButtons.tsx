import React from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store';
import { selectTree } from './TreeSlice';
import { setShow } from './AlertSlice';
import * as utils from './utils';
import { setLoad } from './LoadSlice';

const OperationButtons: React.FC = () => {
  const size = 'sm';
  const dispatch = useAppDispatch();
  const tree = useAppSelector(selectTree);
  const check = () => {
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
    <>
      <Button variant="light" onClick={push} size={size}>
        ALL Push
      </Button>{' '}
      <Button variant="light" onClick={check} size={size}>
        Check
      </Button>{' '}
      <Button variant="light" onClick={deleteOpen} size={size}>
        Delete
      </Button>
    </>
  );
};

export default OperationButtons;
