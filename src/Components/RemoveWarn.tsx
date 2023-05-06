import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store';
import { selectAlert, setShow } from './AlertSlice';
import { selectTree } from './TreeSlice';
import * as utils from './utils';

const RemoveWarn: React.FC = () => {
  //local loading state
  const [load, setLoad] = React.useState(false);
  const alert = useAppSelector(selectAlert);
  const tree = useAppSelector(selectTree);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setShow(false));
  };
  const deleteDir = () => {
    setLoad(true);
    const checked = tree.checked;
    let pushList = utils.convCheckList(checked);
    utils
      .deleteDirData(pushList)
      .then((res) => {
        console.log(res);
        setLoad(false);
        dispatch(setShow(false));
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        dispatch(setShow(false));
      });
  };
  return (
    <Modal show={alert.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">警告</Modal.Title>
      </Modal.Header>
      <Modal.Body>helo</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          戻る
        </Button>
        <Button variant="danger" onClick={deleteDir}>
          削除
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveWarn;
