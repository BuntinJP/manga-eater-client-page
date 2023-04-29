import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { changeTest, changeBool, selectTest } from './TestSlice';
import { useAppSelector, useAppDispatch } from '../store';

const ReduxTest: React.FC = () => {
  const test = useAppSelector(selectTest);
  const dispatch = useAppDispatch();
  const [text, setText] = React.useState<string>(''); //input text
  return (
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
  );
};

export default ReduxTest;
