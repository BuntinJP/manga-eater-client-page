import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchDirectory } from './utils';
import { ArchiveState, DirectoryOutbound } from './types';
/* Components */
import ReduxTest from './ReduxTest';
import CheckboxTree, { Node } from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

/* Bootstrap */
import { Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/* MUI */
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/* Redux */
import { useAppSelector, useAppDispatch } from '../store';
import {
  selectDirectory,
  init,
  addDirectory,
  removeDirectory,
  editDirectory,
} from './DirectorySlice';
import {
  initTree,
  selectTree,
  setTree,
  setChecked,
  setExpanded,
  setFilterd,
} from './TreeSlice';

/* 
===========================================

TODO
現状TreeViewまでいけた
TreeViewの中身node:Node[]と、DirectoryState:Archive[]を同期させる


===========================================
*/

const FilterDirTree: React.FC = () => {
  const tree = useAppSelector(selectTree);
  const dispatch = useAppDispatch();
  const nodes = tree.nodes;
  const [filterText, setFilterText] = useState<string>('');
  useEffect(() => {
    //once excuse
    const fetchedNode = [
      {
        value: 'mars',
        label: 'Mars',
        children: [
          { value: 'phobos', label: 'Phobos' },
          { value: 'deimos', label: 'Deimos' },
        ],
      },
      {
        value: 'ttt',
        label: 'ttt',
        children: [
          { value: 'tt', label: 'qwe' },
          { value: 'qwe', label: 'ert' },
        ],
      },
      {
        value: '青木',
        label: '青木',
        children: [
          { value: `は？`, label: 'は？' },
          { value: 'どゆこと', label: 'どゆこと' },
        ],
      },
    ];
    //これはフェッチしたdirectory
    dispatch(initTree(fetchedNode));
  }, [dispatch]);
  const filterTree = (filterText: string) => {
    if (!filterText) {
      dispatch(setFilterd(nodes));
      return;
    }
    const filtered = nodes
      .map((node) => filterNodes(node, filterText))
      .filter((node) => node !== null) as Node[];
    dispatch(setFilterd(filtered));
  };

  const filterNodes = (node: Node, filterText: string): Node | null => {
    if (node.value.includes(filterText)) {
      return node;
    }
    return null;
  };

  return (
    <div className="filter-container">
      <input
        className="filter-text"
        placeholder="タイトル検索"
        type="text"
        value={filterText}
        onChange={(e) => {
          const t = e.target.value;
          setFilterText(t);
          filterTree(t);
        }}
      />
      <CheckboxTree
        checked={tree.checked}
        expanded={tree.expanded}
        nodes={tree.filterd}
        onCheck={(e) => dispatch(setChecked(e))}
        onExpand={(e) => dispatch(setExpanded(e))}
      />
    </div>
  );
};

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
  const [directoryState, setDirectoryState] = React.useState<ArchiveState[]>(
    []
  );
  useEffect(() => {
    //once excuse
    fetchDirectory().then((dir) => {
      console.log(dir);
      console.log('initialize directoryState');
      setDirectoryState(stateInit(dir));
      console.log('directoryState', directoryState);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('useEffect Called');
  }, []);
  return (
    <>
      {/* dark theme */}
      <br />
      <Card bg="dark" key="directory-card" text="light">
        <Card.Header>
          <h5>Scraped Directory</h5>
        </Card.Header>
        <Card.Body>
          <FilterDirTree />
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default DirectoryCard;
