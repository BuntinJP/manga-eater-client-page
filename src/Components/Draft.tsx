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
import { selectTree, setTree, setChecked, setExpanded } from './TreeSlice';

const DirectoryTreeView: React.FC = () => {
  const type = 'checkbox';
  const directory = useAppSelector(selectDirectory);
  const dispatch = useAppDispatch();
  const mockDir: ArchiveState[] = [
    { title: '売国機関', episodes: ['1-32', '2-38'], checkedEpisodes: [] },
    {
      title: '田んぼで拾った女騎士、田舎で俺の嫁だと思われている',
      episodes: [
        '1-25',
        '2-32',
        '3-15',
        '4-13',
        '5-22',
        '6-18',
        '7-17',
        '8-18',
      ],
      checkedEpisodes: [],
    },
    {
      title: '薫る花は凛と咲く',
      episodes: ['1-54', '2-54', '3-34', '4-26', '5-20'],
      checkedEpisodes: [],
    },
  ];
  return (
    <TreeView
      aria-label="directory status tree"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {/* <TreeItem nodeId="1" label="Applications">
        <Form>
          <Form.Check
            type="checkbox"
            id={`default-${type}`}
            label={`manko`}
            onChange={() => console.log('manko')}
          />
        </Form>
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem> */}
      {mockDir.map((dir, index) => {
        return (
          <TreeItem nodeId={`titles-${index}`} label={dir.title}>
            {dir.episodes.map((ep) => {
              return (
                <Form>
                  <Form.Check
                    type="checkbox"
                    id={`default-${type}`}
                    label={`${ep}`}
                    onChange={() => console.log('manko')}
                  />
                </Form>
              );
            })}
          </TreeItem>
        );
      })}
    </TreeView>
  );
};

export { DirectoryTreeView };
