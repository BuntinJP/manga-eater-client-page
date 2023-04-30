import React, { useState, useEffect } from 'react';
import CheckboxTree, { Node } from 'react-checkbox-tree';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppSelector, useAppDispatch } from '../store';
import {
  initTree,
  selectTree,
  setChecked,
  setExpanded,
  setFilterd,
} from './TreeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronRight,
  faChevronDown,
  faPlusSquare,
  faMinusSquare,
  faFile,
  faBookOpen,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { ArchiveState, DirectoryOutbound } from './types';
import { fetchDirectory } from './utils';

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
const FilterDirTree: React.FC = () => {
  const fetchedNodes: Node[] = [
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
  const tree = useAppSelector(selectTree);
  const dispatch = useAppDispatch();
  const nodes = tree.nodes;
  const [filterText, setFilterText] = useState<string>('');
  useEffect(() => {
    fetchDirectory().then((dir) => {
      const state = stateInit(dir);
      console.log('state = ');
      console.log(state);
      const fetchedNodesTemp: Node[] = state.map((archive) => {
        return {
          value: archive.title,
          label: archive.title,
          children: archive.episodes.map((episode) => {
            return {
              value: episode,
              label: episode,
            };
          }),
        };
      });
      dispatch(initTree(fetchedNodesTemp));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    /* TODO:DLし、ディレクトリ構造が変わったら再度初期化を行う */
    console.log('TODO');
  }, []);

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
    console.log('node.label = ' + node.label);
    if (typeof node.label !== 'string') {
      console.log('node.label is not string');
      return null;
    }
    if (node.label.includes(filterText)) {
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
        icons={{
          check: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-check"
              icon={faCheckSquare}
              style={{ color: 'white' }}
            />
          ),
          uncheck: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-uncheck"
              icon={faSquare}
              style={{ color: 'white' }}
            />
          ),
          halfCheck: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-half-check"
              icon={faCheckSquare}
              style={{ color: 'white' }}
            />
          ),
          expandClose: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-expand-close"
              icon={faChevronRight}
              style={{ color: 'white' }}
            />
          ),
          expandOpen: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-expand-open"
              icon={faChevronDown}
              style={{ color: 'white' }}
            />
          ),
          expandAll: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-expand-all"
              icon={faPlusSquare}
              style={{ color: 'white' }}
            />
          ),
          collapseAll: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-collapse-all"
              icon={faMinusSquare}
              style={{ color: 'white' }}
            />
          ),
          parentClose: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-parent-close"
              icon={faBook}
              style={{ color: 'white' }}
            />
          ),
          parentOpen: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-parent-open"
              icon={faBookOpen}
              style={{ color: 'white' }}
            />
          ),
          leaf: (
            <FontAwesomeIcon
              className="rct-icon rct-icon-leaf-close"
              icon={faFile}
              style={{ color: 'white' }}
            />
          ),
        }}
      />
    </div>
  );
};

export default FilterDirTree;
// export Node as Node;
export type { Node };
