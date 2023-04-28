import React, { useEffect } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
interface Archive {
  title: string;
  episodes: string[];
}
interface ArchiveState extends Archive {
  checkedEpisodes: number[];
  // check episodes index
}

interface DirectoryOutbound {
  //(GET /directory Response)
  titles: string[];
  outbound: Archive[];
}

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

// handle of state in tree view
//TODO
const state2tree = () => {};
const tree2state = () => {};

const DirectoryCard: React.FC = () => {
  const [ifChecked, setIfChecked] = React.useState(false);
  const [directoryState, setDirectoryState] = React.useState<ArchiveState[]>(
    []
  );
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
  const fetchDirectory = async () => {
    const res = await fetch('http://localhost:3000/directory');
    const directory = (await res.json()) as DirectoryOutbound;
    return directory;
  };
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
    </>
  );
};

export default DirectoryCard;
