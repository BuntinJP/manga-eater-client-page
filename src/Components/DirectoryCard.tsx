import React, { useEffect } from 'react';
import '../App.css';
import { fetchDirectory } from './utils';
import { ArchiveState, DirectoryOutbound } from './types';

/* Bootstrap */
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/* MUI */
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/* Redux */
import {
  changeTest,
  changeBool,
  selectTest,
  useAppSelector,
  useAppDispatch,
} from './TestSlice';

const DirectoryTreeView: React.FC = () => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};

/* 
Directory Response Example:
{
    "titles": [
        "ヤニねこ",
        "生意気ギャルの家庭教師、始めます"
    ],
    "outbound": [
        {
            "title": "ヤニねこ",
            "episodes": [
                "1-13",
                "2-13"
            ]
        },
        {
            "title": "生意気ギャルの家庭教師、始めます",
            "episodes": [
                "1-46",
                "2-37"
            ]
        }
    ]
}
*/

const stateInit = (dir: DirectoryOutbound) => {
  const archives = dir.outbound;
  const state = archives.map((archive) => {
    return {
      title: archive.title,
      episodes: archive.episodes,
      checkedEpisodes: [],
    } as ArchiveState;
  });
  return state;
};

const DirectoryCard: React.FC = () => {
  const [text, setText] = React.useState<string>(''); //input text
  const [ifChecked, setIfChecked] = React.useState(false);
  const [directoryState, setDirectoryState] = React.useState<ArchiveState[]>(
    []
  );
  const test = useAppSelector(selectTest);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //once excuse
    fetchDirectory().then((dir) => {
      setDirectoryState(stateInit(dir));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('useEffect Called');
  }, []);
  const type = 'checkbox';
  return (
    <>
      <Button variant="primary" onClick={fetchDirectory}>
        Fetch Directory
      </Button>
      {/* dark theme */}
      <br />
      <Card bg="dark" key="directory-card" text="light">
        <Card.Header>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Directory Card</Form.Label>
                <Form.Control type="text" placeholder="Enter directory" />
              </Form.Group>
            </Col>
            <Col>Right Side</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Check
              type="checkbox"
              id={`default-${type}`}
              label={`check`}
              onChange={() => setIfChecked(!ifChecked)}
            />
            <br />
            test
            {ifChecked ? <p>Checked</p> : <p>Not Checked</p>}
          </Form>
        </Card.Body>
      </Card>
      <br />
      {/* <DirectoryTreeView /> */}
      <br />
      <Card bg="dark" key="directory-card-redux-test" text="light">
        <Card.Header>Redux Test</Card.Header>
        <Card.Body>
          <code>{JSON.stringify(test)}</code>
          <br />
          {/* input */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Directory Card</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter directory"
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary" onClick={() => dispatch(changeTest(text))}>
            Change Test to {text}
          </Button>
          <br />
          <Button
            variant="primary"
            onClick={() => dispatch(changeBool(!test.ifbool))}
          >
            Change Bool
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default DirectoryCard;
