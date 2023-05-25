import React from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { setShow } from './redux/AlertSlice';
import { selectAlert } from './redux/stateSelector';
import './styles/alert.css';

const ErrorAlert: React.FC = () => {
  const alert = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();
  const handleClicked = () => {
    dispatch(setShow(false));
    console.log('handleClicked');
  };
  const al = (
    <div className="overlay">
      <div className="content">
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{alert.message}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={handleClicked}
          ></button>
        </div>
      </div>
    </div>
  );
  return <>{alert.show ? al : null}</>;
};

export default ErrorAlert;
