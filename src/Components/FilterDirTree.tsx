import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchDirectory, trimZero } from './utils';
import OperationButtons from './OperationButtons';
//Redux
import { useAppSelector, useAppDispatch } from '../store';
import { initTree, setChecked, setExpanded, setFilterd } from './TreeSlice';
import { selectLoad, selectTree, selectServerStatus } from './stateSelector';
// React-Checkbox-Tree
import CheckboxTree, { Node } from 'react-checkbox-tree';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
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
  const ifloading = useAppSelector(selectLoad);
  const tree = useAppSelector(selectTree);
  const serverStatus = useAppSelector(selectServerStatus);
  const dispatch = useAppDispatch();
  const nodes = tree.nodes;
  const [filterText, setFilterText] = useState<string>('');
  const loadTree = async () => {
    fetchDirectory().then((dir) => {
      const state = stateInit(dir);
      const fetchedNodesTemp: Node[] = state.map((archive, index) => {
        return {
          value: `${index}`,
          label: archive.title,
          children: archive.episodes.map((episode, childrenIndex) => {
            const epInfo = episode.split('-');
            const ep = trimZero(epInfo[0]);
            const page = epInfo[1];
            return {
              value: `${index} ${childrenIndex}`,
              label: `${ep} (${page}ページ)`,
            };
          }),
        };
      });
      dispatch(initTree(fetchedNodesTemp));
    });
  };
  useEffect(() => {
    loadTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (ifloading) {
      return;
    }
    loadTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverStatus]);

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
    if (typeof node.label !== 'string') {
      return null;
    }
    if (node.label.includes(filterText)) {
      return node;
    }
    return null;
  };

  const nonLoadComp: JSX.Element = (
    <div className="filter-container">
      <Row>
        <Col md="auto">
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
        </Col>
        <Col md="auto">
          <OperationButtons />
        </Col>
      </Row>
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
  const loadingComp: JSX.Element = (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
  return <>{ifloading ? loadingComp : nonLoadComp}</>;
};

export default FilterDirTree;
