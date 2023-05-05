import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, Card, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store';
import { selectLoad, setLoad } from './LoadSlice';
import { selectTree } from './TreeSlice';
import { pushDirData } from './utils';
import { Checked } from './types';

const UrlCard: React.FC = () => {
  const ifloading = useAppSelector(selectLoad);
  const dispatch = useAppDispatch();
  const tree = useAppSelector(selectTree);
  const check = () => {
    //check button clicked
    dispatch(setLoad(!ifloading));
  };

  return (
    <Card className="text-center bg-dark">
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter Url" />
            <Form.Text className="text-muted">
              mangarawjp.ioのURLを入力
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="button">
            DL
          </Button>
          {'  '}
          <Button variant="warning" type="button">
            DL & Push
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UrlCard;
