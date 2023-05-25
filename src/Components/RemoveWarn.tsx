import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store';
import { setShow } from './redux/AlertSlice';
import { selectTree, selectAlert } from './redux/stateSelector';
import * as utils from './utils';

const RemoveWarn: React.FC = () => {
  const [text, setText] = React.useState<string>('');
  const alert = useAppSelector(selectAlert);
  const tree = useAppSelector(selectTree);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    utils.fetchDirectory().then((dir) => {
      let removePlan = '削除対象\n';
      const checked = utils.convCheckList(tree.checked);
      checked.forEach((item, i) => {
        const outbound = dir.outbound[item.index]; //episode names
        const { title, episodes } = outbound;
        const checkedEpisodes = item.checked.map((index) => {
          const t = episodes[index].split('-').shift() || 'bug occured';
          return utils.trimZero(t);
        });
        removePlan += `${title}(${checkedEpisodes.join(', ')})${
          i === checked.length - 1 ? '' : ', '
        }`;
      });
      setText(removePlan);
    });
  }, [tree.checked]);
  const handleClose = () => {
    dispatch(setShow(false));
  };
  const deleteDir = () => {
    const checked = tree.checked;
    let pushList = utils.convCheckList(checked);
    utils
      .deleteDirData(pushList)
      .then((res) => {
        console.log(res);
        dispatch(setShow(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setShow(false));
      });
  };
  return (
    <Modal show={alert.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">警告</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
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
