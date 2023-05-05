import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import * as utils from './utils';

const UrlCard: React.FC = () => {
  const [inputs, setInputs] = React.useState<string>('');
  return (
    <Card className="text-center bg-dark">
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter Url"
              value={inputs}
              onChange={(e) => {
                const inp = e.target.value;
                try {
                  setInputs(decodeURIComponent(inp));
                } catch (e) {
                  setInputs(inp);
                }
              }}
            />
            <Form.Text className="text-muted">
              mangarawjp.ioのURLを入力
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              utils.pushUrl(encodeURI(inputs), false);
            }}
          >
            DL
          </Button>
          {'  '}
          <Button
            variant="warning"
            type="button"
            onClick={() => {
              console.log('omako');
              utils.pushUrl(inputs, true);
            }}
          >
            DL & Push
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UrlCard;
