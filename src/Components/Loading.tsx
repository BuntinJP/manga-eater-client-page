import React from 'react';
import './styles/loading.css';
import { useAppSelector } from '../store';
import { selectLoad } from './redux/stateSelector';

const Loading: React.FC = () => {
  const ifloading = useAppSelector(selectLoad);
  if (ifloading) {
    return (
      <div className="loading">
        <div>
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
