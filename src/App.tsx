import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import MainNav from './Components/MainNav';
import ChannelCard from './Components/ChannelCard';
import OperationCard from './Components/OperationCard';

const App: React.FC = () => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  return (
    <div className="App">
      <MainNav version="1.0.0" isLoading={isLoading} />
      <Row>
        <Col>
          <ChannelCard isLoading={isLoading} setLoading={setLoading} />
        </Col>
        <Col>
          <OperationCard />
        </Col>
      </Row>

      {isLoading ? 'true' : 'false'}
    </div>
  );
};

export default App;
